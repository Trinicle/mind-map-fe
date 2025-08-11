import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { getApiUrl, Response } from '../../shared/api/route';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { ApiError } from '../../shared/types/api.types';
import { ToastService } from '../../core/toast/toast.service';
import {
  DashboardCard,
  DashboardCardPostRequest,
  DashboardCardSearchRequest,
  DashboardTags,
  DashboardTagsResponse,
} from './dashboard-store';

interface DashboardResponse extends Response<DashboardCard[]> {}

interface DashboardCardResponse extends Response<DashboardCard> {}

@Injectable()
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  getCards(): Observable<DashboardCard[]> {
    return this.http
      .get<DashboardResponse>(getApiUrl('/dashboard/mindmap'))
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  getTags(): Observable<DashboardTags[]> {
    return this.http
      .get<DashboardTagsResponse>(getApiUrl('/dashboard/mindmap/tags'))
      .pipe(
        map((response) => response.data),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }

  getFilteredCards(request: DashboardCardSearchRequest) {
    return this.http
      .get<DashboardResponse>(getApiUrl('/dashboard/mindmap/search'), {
        params: {
          title: request.title,
          tags: request.tags,
          date: request.date,
        },
      })
      .pipe(
        switchMap((response) => {
          return of(response.data);
        })
      );
  }

  createCard(card: DashboardCardPostRequest): Observable<DashboardCard> {
    const formData = new FormData();
    formData.append('file', card.file);
    formData.append('title', card.title);
    formData.append('description', card.description);
    formData.append('date', card.date.toISOString());
    formData.append('tags', JSON.stringify(card.tags));

    return this.http
      .post<DashboardCardResponse>(getApiUrl('/dashboard/mindmap'), formData)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        })
      );
  }
}
