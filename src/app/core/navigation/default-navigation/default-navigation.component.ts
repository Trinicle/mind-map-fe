import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
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
  protected readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  routes: NavigationRoute[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      isActive: () => this.router.url === '/dashboard',
      onClick: () => this.router.navigate(['/dashboard']),
    },
  ];
}
