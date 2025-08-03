import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface MindMapTranscript {
  id: string;
  text: string;
  isLoading: boolean;
}

const initialState: MindMapTranscript = {
  id: '',
  text: '',
  isLoading: false,
};

export const TranscriptStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setTranscript(transcript: MindMapTranscript) {
      patchState(store, {
        ...transcript,
      });
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    clearTranscript() {
      patchState(store, {
        ...initialState,
      });
    },
  }))
);
