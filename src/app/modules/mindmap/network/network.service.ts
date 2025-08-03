import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, catchError, throwError, finalize } from 'rxjs';
import { ToastService } from '../../../core/toast/toast.service';
import { getApiUrl } from '../../../shared/api/route';
import { ApiError } from '../../../shared/types/api.types';
import { MindMapTopic, TopicStore } from './topics-store';

interface PythonTopic {
  id: string;
  title: string;
  connected_topics: string[];
  mindmap_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface MindMapTopicResponse {
  data: PythonTopic[];
  message: string;
}

@Injectable()
export class NetworkService {
  private readonly http = inject(HttpClient);
  private readonly topicStore = inject(TopicStore);
  private readonly toast = inject(ToastService);

  getTopics(id: string) {
    this.topicStore.setIsLoading(true);

    return this.http
      .get<MindMapTopicResponse>(getApiUrl(`/mindmap/${id}/topics`))
      .pipe(
        map((response) => {
          response.data.forEach((topic) => {
            const data: MindMapTopic = {
              id: topic.id,
              title: topic.title,
              connectedTopics: topic.connected_topics,
              updatedAt: new Date(topic.updated_at),
              createdAt: new Date(topic.created_at),
            };
            this.topicStore.addTopic(data);
          });
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        }),
        finalize(() => {
          this.topicStore.setIsLoading(false);
        })
      );
  }
}
