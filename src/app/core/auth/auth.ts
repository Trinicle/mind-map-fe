import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getApiUrl } from '../../shared/api/route';
import { LoginRequest, SignupRequest } from './auth-model';
import { catchError, tap } from 'rxjs';
import { Toast } from '../services/toast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(Toast);
  private readonly router = inject(Router);

  public signup(request: SignupRequest) {
    return this.http.post(getApiUrl('/auth/signup'), request).pipe(
      catchError((error) => {
        this.toast.show('There was an error signing up!');
        return error;
      }),
      tap(() => this.router.navigate(['/dashboard']))
    );
  }

  public login(request: LoginRequest) {
    return this.http.post(getApiUrl('/auth/login'), request).pipe(
      catchError((error) => {
        this.toast.show('There was an error logging in!');
        return error;
      }),
      tap(() => this.router.navigate(['/dashboard']))
    );
  }

  public isAuthenticated(): boolean {
    return false;
  }
}
