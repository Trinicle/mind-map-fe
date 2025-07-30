import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { sessionGuard } from './core/auth/session.guard';
import { authGuard } from './core/auth/auth.guard';
import { SigninComponent } from './core/pages/signin/signin.component';
import { SignupComponent } from './core/pages/signup/signup.component';
import { ChatComponent } from './modules/chat/chat.component';

export const routes: Routes = [
  {
    path: 'welcome',
    canActivate: [sessionGuard],
    component: WelcomeComponent,
  },
  {
    path: 'signin',
    canActivate: [sessionGuard],
    component: SigninComponent,
  },
  {
    path: 'signup',
    canActivate: [sessionGuard],
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    component: ChatComponent,
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
