import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from './network.service';
import { finalize, map } from 'rxjs';
import { ElementDefinition } from 'cytoscape';

export interface NetworkTopic {
  id: string;
  title: string;
  connectedTopics: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface NetworkStoreState {
  data: ElementDefinition[];
  isLoading: boolean;
}

const initialState: NetworkStoreState = {
  data: [] as ElementDefinition[],
  isLoading: false,
};

export const NetworkStore = signalStore(
  withEntities<NetworkTopic>(),
  withState(initialState),
  withProps(() => ({
    networkService: inject(NetworkService),
    route: inject(ActivatedRoute),
  })),
  withMethods((store) => ({
    getConnectedTopicId(title: string) {
      return store.entities().find((topic) => topic.title === title)?.id;
    },
    setNetworkData() {
      const data: ElementDefinition[] = [];
      store.entities().forEach((topic) => {
        const node = {
          data: {
            id: topic.id,
            label: topic.title,
          },
        };

        data.push(node);
      });

      const edges = new Set<string>();

      store.entities().forEach((topic) => {
        const title = topic.title;
        const connectedTopics = topic.connectedTopics;

        connectedTopics.forEach((connectedTopic) => {
          if (
            edges.has(`${title}-${connectedTopic}`) ||
            edges.has(`${connectedTopic}-${title}`)
          ) {
            return;
          }

          const edge = {
            data: {
              id: `${title}-${connectedTopic}`,
              source: this.getConnectedTopicId(title),
              target: this.getConnectedTopicId(connectedTopic),
            },
          };

          data.push(edge);
          edges.add(`${title}-${connectedTopic}`);
        });
      });
      patchState(store, {
        data,
      });
    },
  })),
  withHooks(({ route, networkService, ...store }) => ({
    onInit() {
      const id = route.snapshot.params['id'];
      if (!id) return;

      patchState(store, {
        isLoading: true,
      });

      networkService
        .getTopics(id)
        .pipe(
          map((topics: NetworkTopic[]) => {
            patchState(
              store,
              setAllEntities<NetworkTopic>(topics, {
                selectId: (topic) => topic.id,
              })
            );
            store.setNetworkData();
          }),
          finalize(() => {
            patchState(store, {
              isLoading: false,
            });
          })
        )
        .subscribe();
    },
  }))
);
