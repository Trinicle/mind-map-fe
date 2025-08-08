import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tdesignArrowLeft,
  tdesignArrowRight,
  tdesignSearch,
  tdesignPlus,
} from '@ng-icons/tdesign-icons';
import { ConversationsStore } from './conversations-store';
import { ConversationSkeletonListElementComponent } from './conversation-skeleton-list-element/conversation-skeleton-list-element.component';
import { ConversationListElementComponent } from './conversation-list-element/conversation-list-element.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations',
  imports: [
    NgIconComponent,
    ConversationSkeletonListElementComponent,
    ConversationListElementComponent,
  ],
  providers: [
    provideIcons({
      tdesignArrowLeft,
      tdesignArrowRight,
      tdesignSearch,
      tdesignPlus,
    }),
  ],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent {
  protected readonly conversationsStore = inject(ConversationsStore);
  private readonly router = inject(Router);

  readonly minimized = signal(false);
  readonly isLoading = this.conversationsStore.isLoading;
  readonly conversations = this.conversationsStore.entities;
  readonly conversationsLength = computed(() => this.conversations().length);

  onMinimize() {
    this.minimized.set(!this.minimized());
  }

  onNewChat() {
    this.router.navigate(['chat']);
  }
}
