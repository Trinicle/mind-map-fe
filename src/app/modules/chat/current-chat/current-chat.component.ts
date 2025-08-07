import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MessagesStore } from '../chat-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-chat',
  imports: [],
  templateUrl: './current-chat.component.html',
  styleUrl: './current-chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentChatComponent implements OnInit {
  private readonly messagesStore = inject(MessagesStore);
  private readonly route = inject(ActivatedRoute);

  readonly messages = this.messagesStore.entities;
  readonly isLoading = this.messagesStore.isLoading;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('id', id);
    // this.messagesStore.loadMessages(id);
  }
}
