import { Component, input } from '@angular/core';
import { DashboardCard } from '../dashboard-store';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent {
  public readonly card = input<DashboardCard>();
}
