import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { bootstrapPlusCircle } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CreateCardDialogComponent } from './create-card-dialog/create-card-dialog.component';

@Component({
  selector: 'app-dashboard-card-empty',
  imports: [NgIconComponent, CreateCardDialogComponent],
  templateUrl: './dashboard-card-empty.component.html',
  styleUrl: './dashboard-card-empty.component.css',
  providers: [provideIcons({ bootstrapPlusCircle })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardEmptyComponent {
  private readonly modal = viewChild<CreateCardDialogComponent>(
    CreateCardDialogComponent
  );

  onClick() {
    this.modal()?.showModal();
  }
}
