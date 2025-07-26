import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './core/toast/toast';
import { Navigation } from './core/navigation/navigation';
import { Auth } from './core/auth/auth';
import { interval, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly auth = inject(Auth);
  protected readonly title = signal('mind-map-fe');

  ngOnInit(): void {
    // Check session immediately and then every 30 seconds
    interval(30000)
      .pipe(
        startWith(0), // Emit immediately
        switchMap(() => this.auth.checkSession())
      )
      .subscribe();
  }
}
