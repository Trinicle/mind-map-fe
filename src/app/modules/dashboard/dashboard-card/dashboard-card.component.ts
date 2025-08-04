import { Component, inject, input } from '@angular/core';
import { DashboardCard } from '../dashboard-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent {
  public readonly card = input.required<DashboardCard>();
  public readonly router = inject(Router);

  onCardClick() {
    this.router.navigate(['/map', this.card().id, 'network']);
  }
}
