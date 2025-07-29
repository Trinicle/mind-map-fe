import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';

interface NavigationRoute {
  label: string;
  path: string;
  isActive: () => boolean;
  onClick: () => void;
}

@Component({
  selector: 'app-default-navigation',
  imports: [CommonModule, RouterModule, AccountComponent],
  templateUrl: './default-navigation.component.html',
  styleUrl: './default-navigation.component.css',
})
export class DefaultNavigationComponent {
  private readonly router = inject(Router);

  routes: NavigationRoute[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      isActive: () => this.router.url === '/dashboard',
      onClick: () => this.router.navigate(['/dashboard']),
    },
  ];
}
