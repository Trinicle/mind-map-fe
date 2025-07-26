import { Component } from '@angular/core';
import { DashboardCardCollectionStore } from './dashboard-card-store';

@Component({
  selector: 'app-dashboard',
  imports: [],
  providers: [DashboardCardCollectionStore],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
