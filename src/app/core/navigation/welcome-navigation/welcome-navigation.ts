import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome-navigation.html',
  styleUrl: './welcome-navigation.css',
})
export class WelcomeNavigation {
  protected readonly router = inject(Router);
}
