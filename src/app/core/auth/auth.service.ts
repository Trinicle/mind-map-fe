import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getApiUrl } from '../../shared/api/route';
import { LoginRequest, SignupRequest } from './auth-model';
import { catchError, finalize, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Session, User } from '@supabase/supabase-js';
import { UserModel, UserStore } from './user-store';
import { ToastService } from '../toast/toast.service';
import { DashboardCardCollectionStore } from '../../modules/dashboard/dashboard-store';

interface AuthResponse {
  message: string;
  data: {
    session: Session;
    user: User;
  };
}

interface SessionResponse {
  message: string;
  data: Session | null;
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

  public signup(request: SignupRequest) {
    this.userStore.setIsLoading(true);
    return this.http
      .post<AuthResponse>(getApiUrl('/auth/signup'), request)
      .pipe(
        map((response: AuthResponse) => this.populateUser(response.data)),
        catchError((error: AuthError) => {
          this.toast.show('There was an error signing up!');
          return throwError(() => error);
        }),
        tap(() => this.router.navigate(['/dashboard'])),
        finalize(() => this.userStore.setIsLoading(false))
      );
  }

  public login(request: LoginRequest) {
    this.userStore.setIsLoading(true);
    return this.http
      .post<AuthResponse>(getApiUrl('/auth/signin'), request)
      .pipe(
        map((response: AuthResponse) => this.populateUser(response.data)),
        catchError((error: AuthError) => {
          this.toast.show('There was an error logging in!');
          return throwError(() => error);
        }),
        tap(() => this.router.navigate(['/dashboard'])),
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

  public checkSession() {
    this.userStore.setIsLoading(true);
    return this.http.get<SessionResponse>(getApiUrl('/auth/session')).pipe(
      map((response) => {
        const data = response.data;
        if (!data) {
          this.userStore.clearUser();
          return false;
        }
        return true;
      }),
      catchError((error) => {
        this.userStore.clearUser();
        this.userStore.setIsLoading(false);
        return throwError(() => error);
      }),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/signin']);
        }
      }),
      finalize(() => {
        this.userStore.setIsLoading(false);
      })
    );
  }

  private clearStores() {
    this.userStore.clearUser();
    this.cardsStore.clearCards();
  }
}
