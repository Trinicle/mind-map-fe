import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStore } from './user-store';
import { getApiUrl } from '../../shared/api/route';

const AUTH_ENDPOINTS = [
  getApiUrl('/auth/signin'),
  getApiUrl('/auth/signup'),
  getApiUrl('/auth/signout'),
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore = inject(UserStore);

  if (AUTH_ENDPOINTS.includes(req.url) || !req.url.includes(getApiUrl(''))) {
    return next(req);
  }

  const accessToken = userStore.getAccessToken();
  if (accessToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next(authReq);
  }

  return next(req);
};
