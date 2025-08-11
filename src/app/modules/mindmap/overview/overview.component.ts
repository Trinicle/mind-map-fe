import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewService } from './overview.service';
import { MindMapStore, QuestionStore } from './mindmap-store';
import { TranscriptStore } from './transcript-store';
import { OverviewSkeletonComponent } from './overview-skeleton/overview-skeleton.component';

@Component({
  selector: 'app-overview',
  imports: [OverviewSkeletonComponent],
  providers: [OverviewService, MindMapStore, TranscriptStore, QuestionStore],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private readonly transcriptStore = inject(TranscriptStore);
  private readonly mindMapStore = inject(MindMapStore);
  private readonly questionStore = inject(QuestionStore);
  readonly showFollowupQuestions = signal(false);
  readonly showTranscript = signal(false);

  title = this.mindMapStore.title;
  transcript = this.transcriptStore.text;
  participants = this.mindMapStore.participants;
  description = this.mindMapStore.description;
  date = this.mindMapStore.date;
  tags = this.mindMapStore.tags;
  isLoading = this.mindMapStore.isLoading;
  questions = this.questionStore.entities;

  onFollowupQuestionsClick() {
    this.showFollowupQuestions.set(!this.showFollowupQuestions());
  }

  onTranscriptClick() {
    this.showTranscript.set(!this.showTranscript());
  }
}
