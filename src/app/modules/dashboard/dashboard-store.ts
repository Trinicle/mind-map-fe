import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { DashboardCard, DashboardCardCollection } from './dashboard-models';

const initialState: DashboardCardCollection = {
  cards: [],
  isLoading: false,
  currentCreation: false,
};

export const DashboardCardCollectionStore = signalStore(
  { providedIn: 'root' },
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
    clearCards() {
      patchState(store, {
        ...initialState,
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
