import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface ToastState {
  message: string;
  isVisible: boolean;
}

const initialState: ToastState = {
  message: '',
  isVisible: false,
};

export const ToastStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    show(message: string) {
      patchState(store, {
        message,
        isVisible: true,
      });
    },
    hide() {
      patchState(store, {
        isVisible: false,
      });
    },
  }))
);
