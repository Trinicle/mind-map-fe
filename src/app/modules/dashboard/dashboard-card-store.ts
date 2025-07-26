import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type Tag = string | null;

export interface DashboardCardState {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  date: Date;
}

export interface DashboardCardCollectionState {
  cards: DashboardCardState[];
  isLoading: boolean;
}

const initialState: DashboardCardCollectionState = {
  cards: [],
  isLoading: false,
};

export const DashboardCardCollectionStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    addCard(card: DashboardCardState) {
      patchState(store, {
        cards: [...store.cards(), card],
        isLoading: false,
      });
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, {
        isLoading,
      });
    },
  }))
);
