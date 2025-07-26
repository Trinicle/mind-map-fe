import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserState {
  user: UserModel | null;
  isLoading: boolean;
}

export const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setUser(user: UserModel) {
      patchState(store, { user });
    },
    clearUser() {
      patchState(store, { user: null });
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
  }))
);
