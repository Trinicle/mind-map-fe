import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, startWith, switchMap } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { NavigationComponent } from './core/navigation/navigation.component';
import { ToastComponent } from './core/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly auth = inject(AuthService);
  protected readonly title = signal('mind-map-fe');

  ngOnInit(): void {
    // interval(600000)
    //   .pipe(
    //     startWith(0),
    //     switchMap(() => this.auth.checkSession())
    //   )
    //   .subscribe();
  }
}
