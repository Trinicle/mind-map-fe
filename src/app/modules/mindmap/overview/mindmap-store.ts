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
import { OverviewService } from './overview.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';

export interface MindMapDetail {
  id: string;
  title: string;
  participants: string[];
  tags: string[];
  description: string;
  date: Date;
  isLoading: boolean;
}

const initialState: MindMapDetail = {
  id: '',
  title: '',
  participants: [],
  tags: [],
  description: '',
  date: new Date(),
  isLoading: false,
};

export const MindMapStore = signalStore(
  withState(initialState),
  withProps(() => ({
    overviewService: inject(OverviewService),
    route: inject(ActivatedRoute),
  })),
  withHooks(({ route, overviewService, ...store }) => ({
    onInit() {
      const id = route.snapshot.params['id'];
      if (!id) return;

      overviewService
        .getMap(id)
        .pipe(
          map((detail: MindMapDetail) => {
            patchState(store, {
              ...detail,
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
  }))
);

export interface Question {
  id: string;
  question: string;
}

export const QuestionStore = signalStore(
  withEntities<Question>(),
  withState({
    isLoading: false,
  }),
  withProps(() => ({
    overviewService: inject(OverviewService),
    route: inject(ActivatedRoute),
  })),
  withHooks(({ route, overviewService, ...store }) => ({
    onInit() {
      const id = route.snapshot.params['id'];
      if (!id) return;

      patchState(store, {
        isLoading: true,
      });

      overviewService
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
