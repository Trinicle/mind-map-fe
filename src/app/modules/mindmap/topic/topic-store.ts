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
}

export interface TopicState {
  topic: Topic;
  isLoading: boolean;
}

export interface Question {
  id: string;
  text: string;
}

const initialTopicState: TopicState = {
  topic: {
    id: '',
    title: '',
    content: [],
  },
  isLoading: false,
};

export const QuestionStore = signalStore(
  withEntities<Question>(),
  withState({
    isLoading: false,
  }),
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
        .getQuestions(id)
        .pipe(
          map((questions: Question[]) => {
            patchState(
              store,
              setAllEntities<Question>(questions, {
                selectId: (question) => question.id,
              })
            );
          }),
          finalize(() => {
            patchState(store, {
              isLoading: false,
            });
          })
        )
        .subscribe();
    },
  }))
);

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
              topic,
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
      const id = store.topic().id;
      const content = store.topic().content;

      patchState(store, {
        topic: {
          id,
          content,
          title,
        },
      });
    },
  }))
);
