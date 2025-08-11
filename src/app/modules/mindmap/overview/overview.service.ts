import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MindMapDetail, MindMapStore, Question } from './mindmap-store';
import { ToastService } from '../../../core/toast/toast.service';
import {
  map,
  catchError,
  throwError,
  finalize,
  switchMap,
  of,
  Observable,
} from 'rxjs';
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

interface QuestionResponse {
  data: Question[];
  message: string;
}

@Injectable()
export class OverviewService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  getMap(id: string) {
    return this.http
      .get<MindMapDetailResponse>(getApiUrl(`/mindmap/${id}`))
      .pipe(
        switchMap((response) => of(response.data)),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  getTranscript(id: string) {
    return this.http
      .get<MindMapTranscriptResponse>(getApiUrl(`/mindmap/${id}/transcript`))
      .pipe(
        switchMap((response) => of(response.data)),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  getQuestions(id: string): Observable<Question[]> {
    return this.http
      .get<QuestionResponse>(getApiUrl(`/mindmap/${id}/questions`))
      .pipe(
        switchMap((response) => of(response.data)),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }
}
