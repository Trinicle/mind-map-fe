import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { MindMapDetail, MindMapTranscript } from './mindmap-models';

const mindMapDetailInitialState: MindMapDetail = {
  id: '',
  title: '',
  participants: [],
  description: '',
  date: new Date(),
  isLoading: false,
};

const transcriptInitialState: MindMapTranscript = {
  id: '',
  text: '',
  isLoading: false,
};

export const MindMapTranscriptStore = signalStore(
  { providedIn: 'root' },
  withState(transcriptInitialState),
  withMethods((store) => ({
    setTranscript(transcript: MindMapTranscript) {
      patchState(store, {
        ...transcript,
      });
    },
    clearTranscript() {
      patchState(store, {
        ...transcriptInitialState,
      });
    },
  }))
);

export const MindMapStore = signalStore(
  { providedIn: 'root' },
  withState(mindMapDetailInitialState),
  withMethods((store) => ({
    setDetail(detail: MindMapDetail) {
      patchState(store, {
        ...detail,
      });
    },
    clearDetail() {
      patchState(store, {
        ...mindMapDetailInitialState,
      });
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
  }))
);
