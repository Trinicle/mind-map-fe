import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ConversationsComponent } from './conversations/conversations.component';

@Component({
  selector: 'app-chat',
  imports: [ChatInputComponent, ConversationsComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {}
