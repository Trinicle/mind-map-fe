import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { ToastService } from '../../core/toast/toast.service';
import { getApiUrl } from '../../shared/api/route';
import { ApiError } from '../../shared/types/api.types';

interface PythonTopic {
  id: string;
  title: string;
  connected_topics: string[];
  mindmap_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface NetworkTopicResponse {
  data: PythonTopic[];
  message: string;
}

@Injectable()
export class NetworkService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  getTopics(id: string) {
    return this.http
      .get<NetworkTopicResponse>(getApiUrl(`/mindmap/${id}/topics`))
      .pipe(
        map((response) => {
          return response.data.map((topic) => {
            return {
              id: topic.id,
              title: topic.title,
              connectedTopics: topic.connected_topics,
              updatedAt: new Date(topic.updated_at),
              createdAt: new Date(topic.created_at),
            };
          });
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }
}
