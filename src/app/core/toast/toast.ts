import { Component, inject, input } from '@angular/core';
import { bootstrapX } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { ToastStore } from './toast-store';

@Component({
  selector: 'app-toast',
  imports: [NgIcon],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  providers: [provideIcons({ heroXMark })],
})
export class Toast {
  protected readonly store = inject(ToastStore);

  close() {
    this.store.hide();
  }
}
