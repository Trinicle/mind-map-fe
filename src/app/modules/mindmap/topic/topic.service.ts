import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../core/toast/toast.service';
import { getApiUrl } from '../../../shared/api/route';
import { ApiError } from '../../../shared/types/api.types';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Topic } from './topic-store';

interface TopicResponse {
  data: Topic;
  message: string;
}

@Injectable()
export class TopicService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  getTopic(id: string): Observable<Topic> {
    return this.http.get<TopicResponse>(getApiUrl(`/topic/${id}`)).pipe(
      switchMap((response) => of(response.data)),
      catchError((error: ApiError) => {
        this.toast.show(error.message);
        return throwError(() => error);
      })
    );
  }
}
