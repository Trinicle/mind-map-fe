import { Component, inject } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { bootstrapGearFill } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { UserStore } from '../../../auth/user-store';
import { tdesignLogout, tdesignUser1Filled } from '@ng-icons/tdesign-icons';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-account',
  imports: [NgIconComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  providers: [
    provideIcons({ bootstrapGearFill, tdesignLogout, tdesignUser1Filled }),
  ],
})
export class AccountComponent {
  protected readonly userStore = inject(UserStore);
  private readonly authService = inject(AuthService);

  onSignOutClick() {
    this.authService.signOut().subscribe();
  }
}
