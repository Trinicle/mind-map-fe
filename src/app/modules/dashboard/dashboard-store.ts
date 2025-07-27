import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type Tag = string | null;

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  date: Date;
}

export interface DashboardCardCollection {
  cards: DashboardCard[];
  isLoading: boolean;
}

const initialState: DashboardCardCollection = {
  cards: [],
  isLoading: false,
};

export const DashboardCardCollectionStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    addCard(card: DashboardCard) {
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
