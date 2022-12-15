import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateFilmDto, FilmDto, FilmWithScoreDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  apiName = 'Default';
  

  create = (input: CreateUpdateFilmDto) =>
    this.restService.request<any, FilmDto>({
      method: 'POST',
      url: '/api/app/film',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/film/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, FilmDto>({
      method: 'GET',
      url: `/api/app/film/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<FilmDto>>({
      method: 'GET',
      url: '/api/app/film',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });
  

  getUserRecommendationFilms = () =>
    this.restService.request<any, FilmWithScoreDto[]>({
      method: 'GET',
      url: '/api/app/film/user-recommendation-films',
    },
    { apiName: this.apiName });
  

  update = (id: number, input: CreateUpdateFilmDto) =>
    this.restService.request<any, FilmDto>({
      method: 'PUT',
      url: `/api/app/film/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
