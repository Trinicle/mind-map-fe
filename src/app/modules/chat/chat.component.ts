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
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
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

  readonly inNewChat = signal<boolean>(true);

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd),
        map((event) => event.url)
      )
      .subscribe((url) => {
        const urls = url.split('/');
        this.inNewChat.set(urls.length === 2);
      });
  }
}
