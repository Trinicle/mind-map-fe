import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../../core/auth/user-store';
import { DashboardCardEmptyComponent } from './dashboard-card-empty/dashboard-card-empty.component';
import { DashboardCardSkeletonComponent } from './dashboard-card-skeleton/dashboard-card-skeleton.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardCardCollectionStore } from './dashboard-store';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardCardSkeletonComponent,
    DashboardCardComponent,
    DashboardCardEmptyComponent,
    CommonModule,
  ],
  providers: [DashboardCardCollectionStore, DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  protected readonly cardsStore = inject(DashboardCardCollectionStore);
  protected readonly userStore = inject(UserStore);
  private readonly dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.dashboardService.getCards().subscribe();
  }
}
