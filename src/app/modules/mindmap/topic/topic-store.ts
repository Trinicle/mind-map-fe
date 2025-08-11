import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { TopicService } from './topic.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';

interface Content {
  id: string;
  speaker: string;
  text: string;
}

export interface Topic {
  id: string;
  title: string;
  content: Content[];
  isLoading: boolean;
}

const initialTopicState: Topic = {
  id: '',
  title: '',
  content: [],
  isLoading: false,
};

export const TopicStore = signalStore(
  withState(initialTopicState),
  withProps(() => ({
    topicService: inject(TopicService),
    route: inject(ActivatedRoute),
  })),
  withHooks(({ route, topicService, ...store }) => ({
    onInit() {
      const id = route.snapshot.params['topicId'];
      if (!id) return;

      patchState(store, {
        isLoading: true,
      });
      topicService
        .getTopic(id)
        .pipe(
          map((topic: Topic) => {
            patchState(store, {
              id: topic.id,
              title: topic.title,
              content: topic.content,
            });
          }),
          finalize(() => {
            patchState(store, {
              isLoading: false,
            });
          })
        )
        .subscribe();
    },
  })),
  withMethods((store) => ({
    setTitle(title: string) {
      patchState(store, {
        title,
      });
    },
  }))
);
