import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
  effect,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from './network.service';
import { TopicStore } from './topics-store';
import { ThemeStore } from '../../../core/theme/theme-store';
import { switchMap } from 'rxjs';
import cytoscape, { ElementDefinition, Core } from 'cytoscape';

@Component({
  selector: 'app-network',
  imports: [],
  providers: [NetworkService, TopicStore],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css',
})
export class NetworkComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly networkService = inject(NetworkService);
  private readonly topicStore = inject(TopicStore);
  private readonly themeStore = inject(ThemeStore);
  readonly container = viewChild<ElementRef>('cyContainer');
  readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  isLoading = this.topicStore.isLoading;
  topics = this.topicStore.topics;

  private cy: Core | null = null;

  constructor() {
    effect(() => {
      const isDarkTheme = this.themeStore.isDarkTheme();
      if (this.cy) {
        this.updateGraphTheme(isDarkTheme);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.networkService.getTopics(id).subscribe();
    });

    this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          return this.networkService.getTopics(id);
        })
      )
      .subscribe({
        next: () => this.createGraph(),
      });
  }

  ngOnDestroy(): void {
    if (this.cy) {
      this.cy.destroy();
    }
  }

  private createGraph() {
    const data: ElementDefinition[] = [];

    this.topics().forEach((topic) => {
      const node = {
        data: {
          id: topic.id,
          label: topic.title,
        },
      };

      data.push(node);
    });

    const edges = new Set<string>();

    this.topics().forEach((topic) => {
      const title = topic.title;
      const connectedTopics = topic.connectedTopics;

      connectedTopics.forEach((connectedTopic) => {
        if (
          edges.has(`${title}-${connectedTopic}`) ||
          edges.has(`${connectedTopic}-${title}`)
        ) {
          return;
        }

        const edge = {
          data: {
            id: `${title}-${connectedTopic}`,
            source: this.topicStore.getConnectedTopicId(title),
            target: this.topicStore.getConnectedTopicId(connectedTopic),
          },
        };

        data.push(edge);
        edges.add(`${title}-${connectedTopic}`);
      });
    });

    const isDarkTheme = this.themeStore.isDarkTheme();

    this.cy = cytoscape({
      container: this.container()?.nativeElement,
      elements: data,
      layout: { name: 'cose' },
      style: this.getGraphStyle(isDarkTheme),
    });

    this.cy.on('layoutstop', () => {
      this.cy!.zoom(4);
      this.cy!.center();
    });

    this.cy.on('tap', 'node', (evt) => {
      this.dialog().nativeElement.showModal();
    });
  }

  private getGraphStyle(isDarkTheme: boolean) {
    return [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          'background-color': isDarkTheme ? '#007bff' : '#fff',
          color: isDarkTheme ? '#fff' : '#000',
          'border-width': 2,
          'border-color': isDarkTheme ? '#fff' : '#000',
          'font-size': '12px',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 2,
          'line-color': isDarkTheme ? '#ccc' : '#000',
          'curve-style': 'bezier' as const,
        },
      },
    ] as any;
  }

  private updateGraphTheme(isDarkTheme: boolean) {
    if (!this.cy) return;

    const newStyle = this.getGraphStyle(isDarkTheme);
    this.cy.style(newStyle);
  }
}
