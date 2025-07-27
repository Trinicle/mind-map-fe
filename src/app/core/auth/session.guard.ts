import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from './user-store';

export const sessionGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const userStore = inject(UserStore);

  if (userStore.user()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
