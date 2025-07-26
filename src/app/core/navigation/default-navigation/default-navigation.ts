import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../auth/auth';
import { Account } from './account/account';

interface NavigationRoute {
  label: string;
  path: string;
  isActive: () => boolean;
  onClick: () => void;
}

@Component({
  selector: 'app-default-navigation',
  imports: [CommonModule, RouterModule, Account],
  templateUrl: './default-navigation.html',
  styleUrl: './default-navigation.css',
})
export class DefaultNavigation {
  protected readonly router = inject(Router);
  protected readonly auth = inject(Auth);

  routes: NavigationRoute[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      isActive: () => this.router.url === '/dashboard',
      onClick: () => this.router.navigate(['/dashboard']),
    },
  ];
}
