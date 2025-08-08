import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatNavigationService {
  private newlyCreatedConversations = new Set<string>();

  markConversationAsNew(conversationId: string): void {
    this.newlyCreatedConversations.add(conversationId);
  }

  isNewlyCreated(conversationId: string): boolean {
    return this.newlyCreatedConversations.has(conversationId);
  }

  removeFromNewlyCreated(conversationId: string): void {
    this.newlyCreatedConversations.delete(conversationId);
  }
}
