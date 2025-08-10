import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ConversationsComponent } from './conversations/conversations.component';
import {
  RouterOutlet,
  Router,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { CommonModule } from '@angular/common';
import { filter, map, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from './chat.service';
import { MessagesStore } from './chat-store';
import { ConversationsStore } from './conversations/conversations-store';

@Component({
  selector: 'app-chat',
  imports: [
    ConversationsComponent,
    ChatInputComponent,
    RouterOutlet,
    CommonModule,
  ],
  providers: [ChatService, MessagesStore, ConversationsStore],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private messagesStore = inject(MessagesStore);
  readonly inNewChat = signal<boolean>(true);

  readonly isNewlyCreated = signal<boolean>(false);

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd),
        map((event) => event.url),
        startWith(this.router.url)
      )
      .subscribe((url) => {
        console.log(this.isNewlyCreated());
        const urls = url.split('/');
        if (urls.length === 2) {
          this.inNewChat.set(true);
        } else {
          this.inNewChat.set(false);
          const conversationId = urls[2];
          if (!this.isNewlyCreated()) {
            this.messagesStore.loadMessages(conversationId);
          } else {
            // Reset the newly created flag after handling
            this.isNewlyCreated.set(false);
          }
        }
      });
  }
}
