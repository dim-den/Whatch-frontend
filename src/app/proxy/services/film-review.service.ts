import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FilmReviewDto, LeaveReviewDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class FilmReviewService {
  apiName = 'Default';
  

  create = (input: LeaveReviewDto) =>
    this.restService.request<any, FilmReviewDto>({
      method: 'POST',
      url: '/api/app/film-review',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/film-review/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, FilmReviewDto>({
      method: 'GET',
      url: `/api/app/film-review/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<FilmReviewDto>>({
      method: 'GET',
      url: '/api/app/film-review',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });
  

  update = (id: number, input: LeaveReviewDto) =>
    this.restService.request<any, FilmReviewDto>({
      method: 'PUT',
      url: `/api/app/film-review/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
