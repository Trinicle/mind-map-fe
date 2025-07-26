import { Routes } from '@angular/router';
import { Login } from './core/pages/login/login';
import { Welcome } from './features/pages/welcome/welcome';
import { Signup } from './core/pages/signup/signup';

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
    path: 'welcome',
    component: Welcome,
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];
