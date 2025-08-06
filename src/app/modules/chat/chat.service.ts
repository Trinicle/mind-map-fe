import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../core/toast/toast.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Conversation } from './conversations/conversations-store';
import { getApiUrl, Response } from '../../shared/api/route';
import { ApiError } from '../../shared/types/api.types';

interface ConversationsResponse extends Response<Conversation[]> {}

@Injectable()
export class ChatService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);

  getConversations(): Observable<Conversation[]> {
    return this.http
      .get<ConversationsResponse>(getApiUrl('/conversations'))
      .pipe(
        map((response) => response.data),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }
}
