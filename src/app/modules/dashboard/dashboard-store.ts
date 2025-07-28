import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface DashboardCardPostRequest {
  title: string;
  description: string;
  tags: string[];
  date: Date;
  file: File;
}

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: Date;
}

export interface DashboardCardCollection {
  cards: DashboardCard[];
  isLoading: boolean;
  currentCreation: boolean;
}

const initialState: DashboardCardCollection = {
  cards: [],
  isLoading: false,
  currentCreation: false,
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
    addCards(cards: DashboardCard[]) {
      patchState(store, {
        cards: [...store.cards(), ...cards],
        isLoading: false,
      });
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, {
        isLoading,
      });
    },
    setCurrentCreation(currentCreation: boolean) {
      patchState(store, {
        currentCreation,
      });
    },
  }))
);
