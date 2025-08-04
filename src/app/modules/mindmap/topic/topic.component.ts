import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionStore, TopicStore } from './topic-store';

@Component({
  selector: 'app-topic',
  imports: [],
  providers: [QuestionStore, TopicStore],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly topicStore = inject(TopicStore);
  private readonly questionStore = inject(QuestionStore);

  title = this.topicStore.topic.title;
  isLoading = this.questionStore.isLoading;
  questions = this.questionStore.entities;

  ngOnInit(): void {
    console.log(this.isLoading(), this.topicStore.topic());
  }

  onClose() {
    this.router.navigate(['network'], { relativeTo: this.route.parent });
  }
}
