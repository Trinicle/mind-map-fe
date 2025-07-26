import { Component, input } from '@angular/core';
import { DashboardCardState } from '../dashboard-card-store';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css',
})
export class DashboardCard {
  public readonly card = input<DashboardCardState>();
}
