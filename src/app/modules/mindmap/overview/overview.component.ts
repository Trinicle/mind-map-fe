import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewService } from './overview.service';
import { MindMapStore } from './mindmap-store';
import { TranscriptStore } from './transcript-store';
import { OverviewSkeletonComponent } from './overview-skeleton/overview-skeleton.component';

@Component({
  selector: 'app-overview',
  imports: [OverviewSkeletonComponent],
  providers: [OverviewService, MindMapStore, TranscriptStore],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly overviewService = inject(OverviewService);
  private readonly transcriptStore = inject(TranscriptStore);
  private readonly mindMapStore = inject(MindMapStore);

  title = this.mindMapStore.title;
  transcript = this.transcriptStore.text;
  participants = this.mindMapStore.participants;
  description = this.mindMapStore.description;
  date = this.mindMapStore.date;
  tags = this.mindMapStore.tags;
  isLoading = this.mindMapStore.isLoading;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.overviewService.getMap(id).subscribe();
      this.overviewService.getTranscript(id).subscribe();
    });
  }
}
