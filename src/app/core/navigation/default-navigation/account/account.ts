import { Component, inject } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { bootstrapGearFill } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { UserStore } from '../../../auth/user-store';
import { tdesignLogout, tdesignUser1Filled } from '@ng-icons/tdesign-icons';
import { Auth } from '../../../auth/auth';

@Component({
  selector: 'app-account',
  imports: [NgIconComponent],
  templateUrl: './account.html',
  styleUrl: './account.css',
  providers: [
    provideIcons({ bootstrapGearFill, tdesignLogout, tdesignUser1Filled }),
  ],
})
export class Account {
  protected readonly userStore = inject(UserStore);
  protected readonly authService = inject(Auth);

  onSignOutClick() {
    this.authService.signOut().subscribe();
  }
}
