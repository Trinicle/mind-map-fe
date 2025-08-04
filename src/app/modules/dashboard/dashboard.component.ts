import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UserStore } from '../../core/auth/user-store';
import { DashboardCardEmptyComponent } from './dashboard-card-empty/dashboard-card-empty.component';
import { DashboardCardSkeletonComponent } from './dashboard-card-skeleton/dashboard-card-skeleton.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardStore } from './dashboard-store';
import { DashboardService } from './dashboard.service';
import { DashboardSearchComponent } from './dashboard-search/dashboard-search.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardCardSkeletonComponent,
    DashboardCardComponent,
    DashboardCardEmptyComponent,
    DashboardSearchComponent,
    CommonModule,
  ],
  providers: [DashboardService, DashboardStore],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  protected readonly dashboardStore = inject(DashboardStore);
  protected readonly userStore = inject(UserStore);
  private readonly dashboardService = inject(DashboardService);

  readonly cards = this.dashboardStore.entities;
  readonly isLoading = this.dashboardStore.isLoading;
  readonly currentCreation = this.dashboardStore.currentCreation;

  ngOnInit(): void {
    if (this.cards().length === 0) {
      this.dashboardService.getCards().subscribe();
    }
  }
}
