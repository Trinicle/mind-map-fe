import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DefaultNavigation } from './default-navigation/default-navigation';
import { WelcomeNavigation } from './welcome-navigation/welcome-navigation';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, DefaultNavigation, WelcomeNavigation],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  protected readonly router = inject(Router);
}
