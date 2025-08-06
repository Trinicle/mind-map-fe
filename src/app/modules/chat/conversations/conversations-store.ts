import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { ChatService } from '../chat.service';
import { finalize, map } from 'rxjs';
import {
  prependEntity,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';

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
            const test: Conversation[] = [
              {
                id: '1',
                userId: '1',
                title: 'Test 1',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ];
            patchState(
              store,
              setAllEntities<Conversation>(test, {
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
  }))
);
