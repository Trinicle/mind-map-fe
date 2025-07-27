import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
})
export class NavigationComponent {
  protected readonly router = inject(Router);
}
