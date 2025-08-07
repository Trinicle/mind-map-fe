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
  updateEntity,
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
  }),
  withProps(() => ({
    chatService: inject(ChatService),
    route: inject(ActivatedRoute),
  })),

  withMethods(({ chatService, route, ...store }) => ({
    addMessage(message: string, conversationId: string) {
      const humanMessage: Message = {
        id: 'temporary-id',
        type: 'human',
        message: message,
      };
      patchState(
        store,
        addEntity(humanMessage, {
          selectId: (message) => message.id,
        })
      );

      chatService
        .sendMessage(conversationId, message)
        .pipe(
          map((message) => {
            const [sentMessage, aiMessage] = message;
            patchState(
              store,
              updateEntity({
                id: humanMessage.id,
                changes: {
                  id: sentMessage.id,
                },
              })
            );
            patchState(
              store,
              addEntity(aiMessage, {
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
    loadMessages(conversationId: string) {
      patchState(store, {
        isLoading: true,
      });
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
  withHooks(({ chatService, route, ...store }) => ({
    onInit() {
      const conversationId = route.snapshot.params['id'];

      if (!conversationId) return;

      store.loadMessages(conversationId);
    },
  }))
);
