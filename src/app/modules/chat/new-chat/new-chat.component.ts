import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MessagesStore } from '../chat-store';

@Component({
  selector: 'app-new-chat',
  imports: [],
  providers: [],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatComponent implements OnInit {
  private readonly messagesStore = inject(MessagesStore);

  ngOnInit(): void {
    this.messagesStore.clearMessages();
  }
}
