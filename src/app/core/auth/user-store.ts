import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const STORAGE_KEY = 'user_session';

export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken?: string;
  refreshToken?: string;
}

interface UserState {
  user: UserModel | null;
  isLoading: boolean;
}

const storedUser = localStorage.getItem(STORAGE_KEY);
const initialState: UserState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setUser(user: UserModel) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      patchState(store, { user });
    },
    clearUser() {
      localStorage.removeItem(STORAGE_KEY);
      patchState(store, { user: null });
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    getAccessToken() {
      return store.user()?.accessToken;
    },
    getRefreshToken() {
      return store.user()?.refreshToken;
    },
    getFirstName() {
      return store.user()?.firstName;
    },
    getLastName() {
      return store.user()?.lastName;
    },
  }))
);
