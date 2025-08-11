import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { DashboardService } from './dashboard.service';
import { finalize, map } from 'rxjs';
import {
  prependEntity,
  removeAllEntities,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';

export interface DashboardCardPostRequest {
  title: string;
  description: string;
  tags: string[];
  date: Date;
  file: File;
}

export interface DashboardCardSearchRequest {
  title: string;
  tags: string[];
  date: string;
}

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: Date;
}

export interface DashboardTagsResponse {
  data: DashboardTags[];
  message: string;
}

export interface DashboardTags {
  id: string;
  name: string;
}

export const DashboardStore = signalStore(
  withEntities<DashboardCard>(),
  withState({
    isLoading: false,
    currentCreation: false,
  }),
  withProps(() => ({
    dashboardService: inject(DashboardService),
  })),
  withHooks(({ dashboardService, ...store }) => ({
    onInit() {
      patchState(store, {
        isLoading: true,
      });

      dashboardService
        .getCards()
        .pipe(
          map((cards: DashboardCard[]) => {
            cards.forEach((card) => {
              card.date = new Date(card.date);
            });
            patchState(
              store,
              setAllEntities<DashboardCard>(cards, {
                selectId: (card) => card.id,
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
  })),
  withMethods(({ dashboardService, ...store }) => ({
    addCard(card: DashboardCardPostRequest) {
      patchState(store, {
        currentCreation: true,
      });

      dashboardService
        .createCard(card)
        .pipe(
          map((card: DashboardCard) => {
            patchState(
              store,
              prependEntity<DashboardCard>(card, {
                selectId: (card) => card.id,
              })
            );
          }),
          finalize(() => {
            patchState(store, {
              currentCreation: false,
            });
          })
        )
        .subscribe();
    },
    filterCards(request: DashboardCardSearchRequest) {
      patchState(store, {
        isLoading: true,
      });

      dashboardService
        .getFilteredCards(request)
        .pipe(
          map((cards: DashboardCard[]) => {
            cards.forEach((card) => {
              card.date = new Date(card.date);
            });
            patchState(
              store,
              setAllEntities<DashboardCard>(cards, {
                selectId: (card) => card.id,
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

    clearCards() {
      patchState(store, removeAllEntities());
    },
  }))
);
