import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Session } from '@supabase/supabase-js';

const STORAGE_KEY = 'user_session';

export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
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
    setSession(session: Session) {
      const accessToken = session.access_token;
      const refreshToken = session.refresh_token;

      const user = store.user();
      if (user) {
        const updatedUser = {
          ...user,
          accessToken,
          refreshToken,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        patchState(store, { user: updatedUser });
      }
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
