import { Component, input } from '@angular/core';
import { Conversation } from '../conversations-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conversation-list-element',
  imports: [RouterLink],
  templateUrl: './conversation-list-element.component.html',
  styleUrl: './conversation-list-element.component.css',
})
export class ConversationListElementComponent {
  readonly conversation = input.required<Conversation>();
}
