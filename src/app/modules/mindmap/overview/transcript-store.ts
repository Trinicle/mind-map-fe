import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { OverviewService } from './overview.service';
import { finalize, map } from 'rxjs';

export interface MindMapTranscript {
  id: string;
  text: string;
  isLoading: boolean;
}

const initialState: MindMapTranscript = {
  id: '',
  text: '',
  isLoading: false,
};

export const TranscriptStore = signalStore(
  withState(initialState),
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
        .getTranscript(id)
        .pipe(
          map((transcript: MindMapTranscript) => {
            patchState(store, {
              ...transcript,
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
