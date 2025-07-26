import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './default-navigation.html',
  styleUrl: './default-navigation.css',
})
export class DefaultNavigation {
  protected readonly router = inject(Router);

  routes = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      isActive: () => this.router.url === '/dashboard',
    },
    {
      label: 'Logout',
      path: '/logout',
      isActive: () => this.router.url === '/logout',
    },
  ];
}
