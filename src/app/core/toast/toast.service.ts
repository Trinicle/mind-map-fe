import { inject, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { ToastStore } from './toast-store';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly store = inject(ToastStore);

  public show(message: string) {
    this.store.show(message);

    timer(5000).subscribe(() => {
      this.store.hide();
    });
  }
}
