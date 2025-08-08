import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../core/toast/toast.service';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { getApiUrl, Response } from '../../shared/api/route';
import { ApiError } from '../../shared/types/api.types';
import { Conversation } from './conversations/conversations-store';
import { Message, MessageType } from './chat-store';

interface ConversationCreateRequest {
  query: string;
  transcript_id?: string;
}

interface ConversationPython {
  id: string;
  user_id: string;
  transcript_id?: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ConversationPythonResponse extends Response<ConversationPython> {}

interface MessageCreateRequest {
  conversation_id: string;
  message: string;
}

interface MessagePython {
  id: string;
  type: MessageType;
  message: string;
  sources?: string[];
}

interface MessagePythonResponseList extends Response<MessagePython[]> {}

interface ConversationResponse extends Response<Conversation[]> {}

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
    return this.http
      .get<MessagePythonResponseList>(
        getApiUrl(`/conversations/${conversationId}/history`)
      )
      .pipe(
        map((response) => {
          const data = response.data;
          const messages: Message[] = data.map((message) => ({
            id: message.id,
            type: message.type,
            message: message.message,
          }));
          return messages;
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  createConversation(query: string, transcriptId?: string) {
    const request: ConversationCreateRequest = {
      query: query,
      transcript_id: transcriptId,
    };
    return this.http
      .post<ConversationPythonResponse>(getApiUrl('/conversations'), request)
      .pipe(
        map((response) => {
          const data = response.data;
          const conversation: Conversation = {
            id: data.id,
            userId: data.user_id,
            transcriptId: data.transcript_id,
            title: data.title,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
          };
          return conversation;
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  sendMessage(conversationId: string, text: string) {
    const request: MessageCreateRequest = {
      conversation_id: conversationId,
      message: text,
    };
    return this.http
      .post<MessagePythonResponseList>(getApiUrl('/chat'), request)
      .pipe(
        map((response) => {
          const data = response.data;
          const sentMessage = data[0];
          const aiMessage = data[1];
          const sentMessageMapped: Message = {
            id: sentMessage.id,
            type: sentMessage.type,
            message: sentMessage.message,
          };
          const aiMessageMapped: Message = {
            id: aiMessage.id,
            type: aiMessage.type,
            message: aiMessage.message,
          };
          return [sentMessageMapped, aiMessageMapped];
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }
}
