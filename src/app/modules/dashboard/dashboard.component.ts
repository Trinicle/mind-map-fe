import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../../core/auth/user-store';
import { DashboardCardEmptyComponent } from './dashboard-card-empty/dashboard-card-empty.component';
import { DashboardCardSkeletonComponent } from './dashboard-card-skeleton/dashboard-card-skeleton.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardCardCollectionStore } from './dashboard-store';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardCardSkeletonComponent,
    DashboardCardComponent,
    DashboardCardEmptyComponent,
    CommonModule,
  ],
  providers: [DashboardCardCollectionStore],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  protected readonly store = inject(DashboardCardCollectionStore);
  protected readonly userStore = inject(UserStore);

  ngOnInit(): void {
    this.store.setIsLoading(true);
  }
}
