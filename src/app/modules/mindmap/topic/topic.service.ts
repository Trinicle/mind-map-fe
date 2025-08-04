import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../core/toast/toast.service';
import { getApiUrl } from '../../../shared/api/route';
import { ApiError } from '../../../shared/types/api.types';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Question, Topic } from './topic-store';

interface QuestionResponse {
  data: Question[];
  message: string;
}

interface TopicResponse {
  data: Topic;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  getQuestions(id: string): Observable<Question[]> {
    return of([
      {
        id: '1',
        text: 'Test Text',
      },
      {
        id: '2',
        text: 'Test Text 2',
      },
    ]);
    return this.http
      .get<QuestionResponse>(getApiUrl(`/mindmap/${id}/questions`))
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  getTopic(id: string): Observable<Topic> {
    return of({
      id: '1',
      title: 'Test Title',
      content: [
        {
          id: '1',
          speaker: 'Test Speaker',
          text: 'Test Text',
        },
        {
          id: '2',
          speaker: 'Test Speaker 2',
          text: 'Test Text 2',
        },
      ],
    });
    return this.http.get<TopicResponse>(getApiUrl(`/mindmap/${id}`)).pipe(
      map((response) => response.data),
      catchError((error: ApiError) => {
        this.toast.show(error.message);
        return throwError(() => error);
      })
    );
  }
}
