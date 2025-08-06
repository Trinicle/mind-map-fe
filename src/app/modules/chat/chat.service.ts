import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../core/toast/toast.service';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { getApiUrl, Response } from '../../shared/api/route';
import { ApiError } from '../../shared/types/api.types';
import { Conversation } from './conversations/conversations-store';
import { Message } from './chat-store';

interface ConversationCreateRequest {
  transcriptId?: string;
  initial_message: string;
}

interface ConversationCreateResponse extends Response<Conversation> {}

interface ConversationResponse extends Response<Conversation[]> {}

interface MessageResponse extends Response<Message> {}

interface ConversationHistoryResponse extends Response<Message[]> {}

@Injectable()
export class ChatService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);

  getConversations(): Observable<Conversation[]> {
    return this.http
      .get<ConversationResponse>(getApiUrl('/conversations'))
      .pipe(
        map((response) => response.data),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  getConversationHistory(conversationId: string): Observable<Message[]> {
    return of([]);
  }

  createConversation(text: string) {
    const request: ConversationCreateRequest = {
      initial_message: text,
    };
    return this.http
      .post<ConversationCreateResponse>(getApiUrl('/conversations'), request)
      .pipe(
        map((response) => response.data),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  sendMessage(conversationID: string, text: string) {
    return this.http.post;
  }
}
