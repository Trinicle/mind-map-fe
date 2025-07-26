import { Routes } from '@angular/router';
import { Signin } from './core/pages/signin/signin';
import { Welcome } from './modules/welcome/welcome';
import { Signup } from './core/pages/signup/signup';
import { Dashboard } from './modules/dashboard/dashboard';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'signin',
    component: Signin,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'welcome',
    component: Welcome,
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];
