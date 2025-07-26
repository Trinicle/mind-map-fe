import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { sessionGuard } from './core/auth/session-guard';
import { Dashboard } from './modules/dashboard/dashboard';
import { Signup } from './core/pages/signup/signup';
import { Signin } from './core/pages/signin/signin';
import { Welcome } from './modules/welcome/welcome';

export const routes: Routes = [
  {
    path: 'welcome',
    canActivate: [sessionGuard],
    component: Welcome,
  },
  {
    path: 'signin',
    canActivate: [sessionGuard],
    component: Signin,
  },
  {
    path: 'signup',
    canActivate: [sessionGuard],
    component: Signup,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: Dashboard,
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
