import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DefaultNavigationComponent } from './default-navigation/default-navigation.component';
import { WelcomeNavigationComponent } from './welcome-navigation/welcome-navigation.component';

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    RouterModule,
    DefaultNavigationComponent,
    WelcomeNavigationComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  protected readonly router = inject(Router);

  readonly url = signal<string>(this.router.url);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url.set(event.url);
      }
    });
  }
}
