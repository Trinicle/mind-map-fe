import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { ConversationsStore } from './conversations/conversations-store';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { addEntity } from '@ngrx/signals/entities';
import { finalize, map } from 'rxjs';

export type ChatUser = 'llm' | 'user';

export interface Message {
  id: string;
  from: ChatUser;
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
    conversationStore: inject(ConversationsStore),
    route: inject(ActivatedRoute),
  })),
  withHooks(({ chatService, conversationStore, route, ...store }) => ({
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
  withMethods(({ chatService, conversationStore, route, ...store }) => ({
    addMessage(message: string) {
      patchState(store, {
        initialSentMessage: message,
      });
    },
  }))
);
