import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../auth/auth';

interface NavigationRoute {
  label: string;
  path: string;
  isActive: () => boolean;
  onClick: () => void;
}

@Component({
  selector: 'app-default-navigation',
  imports: [CommonModule, RouterModule],
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
    {
      label: 'Sign Out',
      path: '/welcome',
      isActive: () => false,
      onClick: () => this.auth.signOut().subscribe(),
    },
  ];
}
