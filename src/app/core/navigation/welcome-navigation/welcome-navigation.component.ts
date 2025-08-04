import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome-navigation.component.html',
  styleUrl: './welcome-navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeNavigationComponent {
  protected readonly router = inject(Router);
}
