import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { authGuard } from './core/auth/auth.guard';
import { SigninComponent } from './core/pages/signin/signin.component';
import { SignupComponent } from './core/pages/signup/signup.component';
import { ChatComponent } from './modules/chat/chat.component';
import { MindMapComponent } from './modules/mindmap/mindmap.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'map/:id',
    canActivate: [authGuard],
    component: MindMapComponent,
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
