import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

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
  withMethods((store) => ({
    setDetail(detail: MindMapDetail) {
      patchState(store, {
        ...detail,
      });
    },
    clearDetail() {
      patchState(store, {
        ...initialState,
      });
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
  }))
);
