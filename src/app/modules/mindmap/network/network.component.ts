import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
  effect,
  OnDestroy,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeStore } from '../../../core/theme/theme-store';
import cytoscape, { Core } from 'cytoscape';
import { NetworkStore } from '../network-store';

@Component({
  selector: 'app-network',
  imports: [],
  providers: [],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly topicStore = inject(NetworkStore);
  private readonly themeStore = inject(ThemeStore);
  readonly container = viewChild<ElementRef>('cyContainer');

  readonly data = this.topicStore.data;
  readonly isLoading = this.topicStore.isLoading;

  private cy: Core | null = null;

  constructor() {
    effect(() => {
      const isDarkTheme = this.themeStore.isDarkTheme();
      if (this.cy) {
        this.updateGraphTheme(isDarkTheme);
      }
    });

    effect(() => {
      if (!!this.container()) {
        this.createGraph();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cy) {
      this.cy.destroy();
    }
  }

  private createGraph() {
    const isDarkTheme = this.themeStore.isDarkTheme();
    this.cy = cytoscape({
      container: this.container()?.nativeElement,
      elements: this.data(),
      layout: { name: 'cose' },
      style: this.getGraphStyle(isDarkTheme),
    });

    this.cy.on('layoutstop', () => {
      this.cy!.zoom(3);
      this.cy!.center();
    });

    this.cy.on('tap', 'node', (evt) => {
      const topicId = evt.target.data('id');
      this.router.navigate(['topic', topicId], {
        relativeTo: this.route.parent,
      });
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
