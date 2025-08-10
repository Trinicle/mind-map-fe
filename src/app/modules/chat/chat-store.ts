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
  removeAllEntities,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChatService } from './chat.service';
import { filter, finalize, map, Subject, switchMap, tap } from 'rxjs';

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
    conversationId$: new Subject<string>(),
  }),
  withProps(() => ({
    chatService: inject(ChatService),
  })),
  withMethods(({ chatService, ...store }) => ({
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
      store.conversationId$().next(conversationId);
    },
    clearMessages() {
      patchState(store, removeAllEntities());
    },
  })),
  withHooks(({ chatService, ...store }) => ({
    onInit() {
      store
        .conversationId$()
        .pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) =>
            chatService.getConversationHistory(id).pipe(
              map((messages) => {
                patchState(
                  store,
                  setAllEntities(messages, {
                    selectId: (message) => message.id,
                  })
                );
              }),
              finalize(() => {
                patchState(store, { isLoading: false });
              })
            )
          )
        )
        .subscribe();
    },
  }))
);
