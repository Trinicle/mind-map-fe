import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessagesStore } from '../chat-store';

@Component({
  selector: 'app-current-chat',
  imports: [],
  templateUrl: './current-chat.component.html',
  styleUrl: './current-chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentChatComponent {
  private readonly messagesStore = inject(MessagesStore);

  readonly messages = this.messagesStore.entities;
  readonly isLoading = this.messagesStore.isLoading;
}
