import { inject, Injectable } from '@angular/core';
import { ToastStore } from '../toast/toast-store';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  private readonly store = inject(ToastStore);

  public show(message: string) {
    this.store.show(message);

    timer(5000).subscribe(() => {
      this.store.hide();
    });
  }
}
