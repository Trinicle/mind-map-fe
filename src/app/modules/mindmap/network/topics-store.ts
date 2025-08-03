import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface MindMapTopicCollection {
  topics: MindMapTopic[];
  isLoading: boolean;
}

export interface MindMapTopic {
  id: string;
  title: string;
  connectedTopics: string[];
  updatedAt: Date;
  createdAt: Date;
}

const initialState: MindMapTopicCollection = {
  topics: [],
  isLoading: false,
};

export const TopicStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setTopics(topics: MindMapTopic[]) {
      patchState(store, {
        topics,
      });
    },
    addTopic(topic: MindMapTopic) {
      patchState(store, {
        topics: [...store.topics(), topic],
      });
    },
    getConnectedTopicId(title: string) {
      return store.topics().find((topic) => topic.title === title)?.id;
    },
    setIsLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    clearTopic() {
      patchState(store, {
        ...initialState,
      });
    },
  }))
);
