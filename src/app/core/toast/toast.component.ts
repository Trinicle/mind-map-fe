import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { ToastStore } from './toast-store';

@Component({
  selector: 'app-toast',
  imports: [NgIcon],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  providers: [provideIcons({ heroXMark })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected readonly store = inject(ToastStore);

  public close() {
    this.store.hide();
  }
}
