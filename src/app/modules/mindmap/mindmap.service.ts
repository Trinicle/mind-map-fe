import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MindMapStore } from './mindmap-store';
import { MindMapDetail } from './mindmap-models';
import { getApiUrl } from '../../shared/api/route';
import { catchError, finalize, map, throwError } from 'rxjs';
import { ToastService } from '../../core/toast/toast.service';
import { ApiError } from '../../shared/types/api.types';

interface MindMapDetailResponse {
  data: MindMapDetail;
  message: string;
}

@Injectable()
export class MindMapService {
  private readonly http = inject(HttpClient);
  private readonly mindMapStore = inject(MindMapStore);
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

  getTranscript(id: string) {}
}
