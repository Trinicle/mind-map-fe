import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserStore } from './user-store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userStore = inject(UserStore);

  if (authService.isAuthenticated()) {
    return true;
  }

  userStore.clearUser();
  router.navigate(['/signin']);
  return false;
};
