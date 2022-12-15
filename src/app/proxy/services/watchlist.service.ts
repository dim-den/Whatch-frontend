import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { UserWatchlistDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  apiName = 'Default';
  

  getUserWatchlist = () =>
    this.restService.request<any, UserWatchlistDto[]>({
      method: 'GET',
      url: '/api/app/watchlist/user-watchlist',
    },
    { apiName: this.apiName });
  

  getUserWatchlistForFilmByFilmId = (filmId: number) =>
    this.restService.request<any, UserWatchlistDto>({
      method: 'GET',
      url: `/api/app/watchlist/user-watchlist-for-film/${filmId}`,
    },
    { apiName: this.apiName });
  

  postUpdateOrDeleteFromListByFilmId = (filmId: number) =>
    this.restService.request<any, number>({
      method: 'POST',
      url: `/api/app/watchlist/update-or-delete-from-list/${filmId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
