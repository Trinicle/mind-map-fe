import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MindMapDetail, MindMapStore } from './mindmap-store';
import { ToastService } from '../../../core/toast/toast.service';
import { map, catchError, throwError, finalize } from 'rxjs';
import { getApiUrl } from '../../../shared/api/route';
import { ApiError } from '../../../shared/types/api.types';
import { MindMapTranscript, TranscriptStore } from './transcript-store';

interface MindMapDetailResponse {
  data: MindMapDetail;
  message: string;
}

interface MindMapTranscriptResponse {
  data: MindMapTranscript;
  message: string;
}

@Injectable()
export class OverviewService {
  private readonly http = inject(HttpClient);
  private readonly mindMapStore = inject(MindMapStore);
  private readonly transcriptStore = inject(TranscriptStore);
  private readonly toast = inject(ToastService);

  getMap(id: string) {
    this.mindMapStore.setIsLoading(true);
    return this.http
      .get<MindMapDetailResponse>(getApiUrl(`/mindmap/${id}`))
      .pipe(
        map((response) => {
          this.mindMapStore.setDetail(response.data);
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        }),
        finalize(() => {
          this.mindMapStore.setIsLoading(false);
        })
      );
  }

  getTranscript(id: string) {
    this.transcriptStore.setIsLoading(true);

    return this.http
      .get<MindMapTranscriptResponse>(getApiUrl(`/mindmap/${id}/transcript`))
      .pipe(
        map((response) => {
          this.transcriptStore.setTranscript(response.data);
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        }),
        finalize(() => {
          this.transcriptStore.setIsLoading(false);
        })
      );
  }
}
