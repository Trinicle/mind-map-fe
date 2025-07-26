import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getApiUrl } from '../../shared/api/route';
import { SignupRequest } from './auth-model';
import { catchError } from 'rxjs';
import { Toast } from '../services/toast';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(Toast);

  public signup(request: SignupRequest) {
    return this.http.post(getApiUrl('/auth/signup'), request).pipe(
      catchError((error) => {
        this.toast.show('There was an error signing up!');
        return error;
      })
    );
  }

  public isAuthenticated(): boolean {
    return false;
  }
}
