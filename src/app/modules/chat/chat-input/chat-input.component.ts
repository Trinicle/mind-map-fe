import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tdesignPlus, tdesignArrowUp } from '@ng-icons/tdesign-icons';
import { MessagesStore } from '../chat-store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { ChatService } from '../chat.service';
import { ConversationsStore } from '../conversations/conversations-store';

@Component({
  selector: 'app-chat-input',
  imports: [NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ tdesignPlus, tdesignArrowUp })],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly messagesStore = inject(MessagesStore);
  private readonly conversationStore = inject(ConversationsStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly chatService = inject(ChatService);
  private readonly inputDiv =
    viewChild.required<ElementRef<HTMLDivElement>>('inputDiv');

  readonly inNewConversation = signal<boolean>(true);
  readonly messages = this.messagesStore.entities;

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd),
        map((event) => event.url)
      )
      .subscribe((url) => {
        const urls = url.split('/');
        this.inNewConversation.set(urls.length === 2);
      });
  }

  onInput(event: Event) {
    const div = event.target as HTMLDivElement;
    if (
      div.innerHTML === '<p></p>' ||
      div.innerHTML === '<p><br></p>' ||
      div.innerHTML === '<br>' ||
      div.innerHTML === '<div><br></div>'
    ) {
      div.innerHTML = '';
      return;
    }
    const text = div.innerText;
  }

  onSubmit(event: Event | undefined = undefined) {
    if (event) {
      event.preventDefault();
    }
    const text = this.inputDiv().nativeElement.innerText;

    if (this.inNewConversation()) {
      this.conversationStore.createInitialConversation(text);
    }
  }
}
