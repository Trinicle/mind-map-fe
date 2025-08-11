import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicStore } from './topic-store';
import { TopicService } from './topic.service';

@Component({
  selector: 'app-topic',
  imports: [],
  providers: [TopicStore, TopicService],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly topicStore = inject(TopicStore);

  title = this.topicStore.title;
  isLoading = this.topicStore.isLoading;
  content = this.topicStore.content;

  onClose() {
    this.router.navigate(['network'], { relativeTo: this.route.parent });
  }
}
