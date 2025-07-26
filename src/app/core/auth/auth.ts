import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getApiUrl } from '../../shared/api/route';
import { LoginRequest, SignupRequest } from './auth-model';
import { catchError, map, tap, throwError } from 'rxjs';
import { Toast } from '../services/toast';
import { Router } from '@angular/router';
import { Session, User } from '@supabase/supabase-js';
import { UserModel, UserStore } from './user-store';

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
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(Toast);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  public signup(request: SignupRequest) {
    this.userStore.setIsLoading(true);
    return this.http
      .post<AuthResponse>(getApiUrl('/auth/signup'), request)
      .pipe(
        catchError((error: AuthError) => {
          this.toast.show('There was an error signing up!');
          return throwError(() => error);
        }),
        map((response: AuthResponse) => this.populateUser(response.data)),
        tap(() => this.router.navigate(['/dashboard']))
      );
  }

  public login(request: LoginRequest) {
    this.userStore.setIsLoading(true);
    return this.http
      .post<AuthResponse>(getApiUrl('/auth/signin'), request)
      .pipe(
        catchError((error: AuthError) => {
          this.toast.show('There was an error logging in!');
          return throwError(() => error);
        }),
        map((response: AuthResponse) => this.populateUser(response.data)),
        tap(() => this.router.navigate(['/dashboard']))
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
        this.userStore.clearUser();
        this.userStore.setIsLoading(false);
      })
    );
  }
}
