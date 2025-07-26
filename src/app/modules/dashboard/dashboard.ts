import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DashboardCardCollectionStore } from './dashboard-card-store';
import { DashboardCardSkeleton } from './dashboard-card-skeleton/dashboard-card-skeleton';
import { DashboardCard } from './dashboard-card/dashboard-card';
import { DashboardCardEmpty } from './dashboard-card-empty/dashboard-card-empty';
import { UserStore } from '../../core/auth/user-store';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardCardSkeleton,
    DashboardCard,
    DashboardCardEmpty,
    CommonModule,
  ],
  providers: [DashboardCardCollectionStore],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  protected readonly store = inject(DashboardCardCollectionStore);
  protected readonly userStore = inject(UserStore);

  ngOnInit(): void {
    this.store.setIsLoading(true);
  }
}
