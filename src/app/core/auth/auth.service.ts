import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getApiUrl } from '../../shared/api/route';
import { SigninRequest, SignupRequest } from './auth-model';
import {
  catchError,
  finalize,
  map,
  tap,
  throwError,
  firstValueFrom,
} from 'rxjs';
import { Router } from '@angular/router';
import { Session, User } from '@supabase/supabase-js';
import { UserModel, UserStore } from './user-store';
import { ToastService } from '../toast/toast.service';
import { DashboardCardCollectionStore } from '../../modules/dashboard/dashboard-store';
import { MindMapStore } from '../../modules/mindmap/mindmap-store';

interface AuthResponse {
  message: string;
  data: {
    session: Session;
    user: User;
  };
}

interface AuthError {
  message: string;
  code: string;
}

interface UserMetaData {
  email: string;
  email_verified: boolean;
  firstName: string;
  lastName: string;
  phone_verified: boolean;
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);
  private readonly cardsStore = inject(DashboardCardCollectionStore);
  private readonly mindMapStore = inject(MindMapStore);

  public signup(request: SignupRequest) {
    this.userStore.setIsLoading(true);
    return this.http
      .post<AuthResponse>(getApiUrl('/auth/signup'), request)
      .pipe(
        map((response: AuthResponse) => {
          const data = response.data;
          this.populateUser(data);
        }),
        catchError((error: AuthError) => {
          this.toast.show('There was an error signing up!');
          this.userStore.clearUser();
          return throwError(() => error);
        }),
        tap(() => this.router.navigate(['/dashboard'])),
        finalize(() => this.userStore.setIsLoading(false))
      );
  }

  public signin(request: SigninRequest) {
    this.userStore.setIsLoading(true);
    return this.http
      .post<AuthResponse>(getApiUrl('/auth/signin'), request)
      .pipe(
        map((response: AuthResponse) => {
          const data = response.data;
          this.populateUser(data);
        }),
        catchError((error: AuthError) => {
          this.toast.show('There was an error logging in!');
          this.userStore.clearUser();
          return throwError(() => error);
        }),
        tap(() => {
          this.router.navigate(['/dashboard']);
        }),
        finalize(() => this.userStore.setIsLoading(false))
      );
  }

  private populateUser(data: AuthResponse['data']) {
    const user = data.user;
    const session = data.session;
    const metadata = user.user_metadata as UserMetaData;

    const userModel: UserModel = {
      id: user.id,
      email: metadata.email,
      firstName: metadata.firstName,
      lastName: metadata.lastName,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };

    this.userStore.setUser(userModel);
    this.userStore.setIsLoading(false);
  }

  public isAuthenticated(): boolean {
    return this.userStore.user() !== null;
  }

  public signOut() {
    this.userStore.setIsLoading(true);

    return this.http.post(getApiUrl('/auth/signout'), {}).pipe(
      catchError((error) => {
        this.toast.show('There was an error signing out!');
        return throwError(() => error);
      }),
      tap(() => {
        this.router.navigate(['/welcome']);
        this.clearStores();
      }),
      finalize(() => this.userStore.setIsLoading(false))
    );
  }

  public refreshSession() {
    this.userStore.setIsLoading(true);

    const refreshToken = this.userStore.getRefreshToken();
    return this.http
      .post<AuthResponse>(getApiUrl('/auth/refresh'), {
        refresh_token: refreshToken,
      })
      .pipe(
        map((response) => {
          const data = response.data;
          if (!data) {
            this.userStore.clearUser();
            return false;
          }
          this.userStore.setSession(data.session);
          return true;
        }),
        catchError((error) => {
          this.userStore.clearUser();
          this.router.navigate(['/welcome']);
          this.userStore.setIsLoading(false);
          return throwError(() => error);
        }),
        finalize(() => {
          this.userStore.setIsLoading(false);
        })
      );
  }

  private clearStores() {
    this.userStore.clearUser();
    this.cardsStore.clearCards();
    this.mindMapStore.clearDetail();
  }
}
