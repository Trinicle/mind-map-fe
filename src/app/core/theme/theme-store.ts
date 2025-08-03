import { effect } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export type Theme = 'modernblush' | 'brown';

interface ThemeState {
  currentTheme: Theme;
}

const THEME_STORAGE_KEY = 'theme';

const getInitialTheme = (): Theme => {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    return stored || 'modernblush';
  }
  return 'modernblush';
};

const initialState: ThemeState = {
  currentTheme: getInitialTheme(),
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    effect(() => {
      const theme = store.currentTheme();
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    });

    return {
      setTheme(theme: Theme) {
        patchState(store, { currentTheme: theme });
      },
      toggleTheme() {
        const currentTheme = store.currentTheme();
        const newTheme: Theme =
          currentTheme === 'modernblush' ? 'brown' : 'modernblush';
        patchState(store, { currentTheme: newTheme });
      },
      isDarkTheme() {
        return store.currentTheme() === 'modernblush';
      },
      isLightTheme() {
        return store.currentTheme() === 'brown';
      },
    };
  })
);
