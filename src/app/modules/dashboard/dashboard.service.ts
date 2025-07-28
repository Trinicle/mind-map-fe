import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  DashboardCard,
  DashboardCardCollectionStore,
  DashboardCardPostRequest,
} from './dashboard-store';
import { getApiUrl } from '../../shared/api/route';
import { catchError, finalize, map, throwError } from 'rxjs';
import { ApiError } from '../../shared/types/api.types';
import { ToastService } from '../../core/toast/toast.service';

interface DashboardResponse {
  data: DashboardCard[];
}

interface DashboardCardResponse {
  data: DashboardCard;
}

@Injectable()
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly cardsStore = inject(DashboardCardCollectionStore);
  private readonly toast = inject(ToastService);

  getCards() {
    this.cardsStore.setIsLoading(true);

    return this.http
      .get<DashboardResponse>(getApiUrl('/dashboard/mindmap'))
      .pipe(
        map((response) => {
          const cards = response.data;
          this.cardsStore.addCards(cards);
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        }),
        finalize(() => {
          this.cardsStore.setIsLoading(false);
        })
      );
  }

  createCard(card: DashboardCardPostRequest) {
    this.cardsStore.setCurrentCreation(true);
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
          const card = response.data;
          this.cardsStore.addCard(card);
        }),
        catchError((error: ApiError) => {
          this.toast.show(error.message);
          return throwError(() => error);
        }),
        finalize(() => {
          this.cardsStore.setCurrentCreation(false);
        })
      );
  }
}
