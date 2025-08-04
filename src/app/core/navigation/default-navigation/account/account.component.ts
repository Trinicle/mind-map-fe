import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { bootstrapGearFill } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { UserStore } from '../../../auth/user-store';
import { tdesignLogout, tdesignUser1Filled } from '@ng-icons/tdesign-icons';
import { AuthService } from '../../../auth/auth.service';
import { ThemeStore } from '../../../theme/theme-store';
import { akarSun, akarMoon } from '@ng-icons/akar-icons';

@Component({
  selector: 'app-account',
  imports: [NgIconComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  providers: [
    provideIcons({
      bootstrapGearFill,
      tdesignLogout,
      tdesignUser1Filled,
      akarSun,
      akarMoon,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  protected readonly userStore = inject(UserStore);
  protected readonly themeStore = inject(ThemeStore);
  private readonly authService = inject(AuthService);

  theme = signal<string>(this.themeStore.currentTheme());

  onSignOutClick() {
    this.authService.signOut().subscribe();
  }

  onThemeToggle() {
    this.themeStore.toggleTheme();
  }
}
