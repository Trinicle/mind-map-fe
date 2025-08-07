import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { finalize, map } from 'rxjs';

export type MessageType = 'system' | 'ai' | 'human' | 'tool';

export interface Message {
  id: string;
  type: MessageType;
  message: string;
  sources?: string[];
}

export const MessagesStore = signalStore(
  withEntities<Message>(),
  withState({
    isLoading: false,
    initialSentMessage: '',
  }),
  withProps(() => ({
    chatService: inject(ChatService),
    route: inject(ActivatedRoute),
  })),
  withHooks(({ chatService, route, ...store }) => ({
    onInit() {
      const conversationId = route.snapshot.params['id'];

      if (!conversationId) return;

      patchState(store, {
        isLoading: true,
      });

      chatService
        .getConversationHistory(conversationId)
        .pipe(
          map((messages) => {
            patchState(
              store,
              setAllEntities(messages, {
                selectId: (message) => message.id,
              })
            );
          }),
          finalize(() => {
            patchState(store, {
              isLoading: false,
            });
          })
        )
        .subscribe();
    },
  })),
  withMethods(({ chatService, route, ...store }) => ({
    addMessage(message: string, conversationId: string) {
      patchState(store, {
        initialSentMessage: message,
      });

      chatService
        .sendMessage(conversationId, message)
        .pipe(
          map((message) => {
            patchState(
              store,
              addEntity(message, {
                selectId: (message) => message.id,
              })
            );
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
