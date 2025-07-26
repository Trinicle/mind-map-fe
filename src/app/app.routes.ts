import { Routes } from '@angular/router';
import { Login } from './core/pages/login/login';
import { Welcome } from './modules/welcome/welcome';
import { Signup } from './core/pages/signup/signup';
import { Dashboard } from './modules/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'dashboard',
    component: Dashboard,
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
