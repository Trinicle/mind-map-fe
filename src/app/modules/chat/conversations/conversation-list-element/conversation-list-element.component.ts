import { Component, input } from '@angular/core';
import { Conversation } from '../conversations-store';

@Component({
  selector: 'app-conversation-list-element',
  imports: [],
  templateUrl: './conversation-list-element.component.html',
  styleUrl: './conversation-list-element.component.css',
})
export class ConversationListElementComponent {
  readonly conversation = input.required<Conversation>();
}
