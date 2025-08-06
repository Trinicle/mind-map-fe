import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { finalize, map } from 'rxjs';
import {
  prependEntity,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { ChatService } from '../chat.service';

export interface Conversation {
  id: string;
  userId: string;
  transcriptId?: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ConversationsStore = signalStore(
  withEntities<Conversation>(),
  withState({
    isLoading: false,
  }),
  withProps(() => ({
    chatService: inject(ChatService),
  })),
  withHooks(({ chatService, ...store }) => ({
    onInit() {
      patchState(store, {
        isLoading: true,
      });
      chatService
        .getConversations()
        .pipe(
          map((conversations) => {
            patchState(
              store,
              setAllEntities<Conversation>(conversations, {
                selectId: (conversation) => conversation.id,
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
  withMethods(({ chatService, ...store }) => ({
    addConversation(conversation: Conversation) {
      patchState(
        store,
        prependEntity(conversation, {
          selectId: (conversation) => conversation.id,
        })
      );
    },
    createInitialConversation(text: string) {
      patchState(store, {
        isLoading: true,
      });

      chatService
        .createConversation(text)
        .pipe(
          map((conversation) => {
            patchState(
              store,
              prependEntity(conversation, {
                selectId: (conversation) => conversation.id,
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
