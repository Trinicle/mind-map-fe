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
import { ConversationsStore } from '../conversations/conversations-store';

@Component({
  selector: 'app-chat-input',
  imports: [NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ tdesignPlus, tdesignArrowUp })],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  private readonly router = inject(Router);
  private readonly messagesStore = inject(MessagesStore);
  private readonly conversationStore = inject(ConversationsStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly inputDiv =
    viewChild.required<ElementRef<HTMLDivElement>>('inputDiv');

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
    const id = this.route.snapshot.firstChild?.params['id'];

    if (!id) {
      this.conversationStore
        .createInitialConversation()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (conversation) => {
            this.router.navigate(['/chat', conversation.id]).then(() => {
              this.messagesStore.addMessage(text, conversation.id);
            });
          },
          error: (error) => {
            console.error('Failed to create conversation:', error);
          },
        });
    } else {
      this.messagesStore.addMessage(text, id);
    }

    this.inputDiv().nativeElement.innerText = '';
  }
}
