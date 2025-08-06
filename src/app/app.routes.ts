import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { authGuard } from './core/auth/auth.guard';
import { SigninComponent } from './core/pages/signin/signin.component';
import { SignupComponent } from './core/pages/signup/signup.component';
import { ChatComponent } from './modules/chat/chat.component';
import { MindMapComponent } from './modules/mindmap/mindmap.component';
import { TopicComponent } from './modules/mindmap/topic/topic.component';
import { NetworkComponent } from './modules/mindmap/network/network.component';
import { NewChatComponent } from './modules/chat/new-chat/new-chat.component';
import { CurrentChatComponent } from './modules/chat/current-chat/current-chat.component';

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
    children: [
      {
        path: 'topic/:topicId',
        canActivate: [authGuard],
        component: TopicComponent,
      },
      {
        path: 'network',
        canActivate: [authGuard],
        component: NetworkComponent,
      },
    ],
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    component: ChatComponent,
    children: [
      {
        path: ':id',
        canActivate: [authGuard],
        component: CurrentChatComponent,
      },
      {
        path: '',
        canActivate: [authGuard],
        component: NewChatComponent,
      },
      {
        path: '**',
        canActivate: [authGuard],
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
