import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FilmSearchDto, SearchFilmDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiName = 'Default';
  

  getSearchFilmByRequest = (request: SearchFilmDto) =>
    this.restService.request<any, PagedResultDto<FilmSearchDto>>({
      method: 'GET',
      url: '/api/app/search/search-film',
      params: { key: request.key, filterBy: request.filterBy, sorting: request.sorting, skipCount: request.skipCount, maxResultCount: request.maxResultCount },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
