import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateFilmReviewDto, FilmReviewDto, FilmReviewsInfoDto, GetFilmReviewDto, LeaveReviewDto, LeaveScoreDto, UserFilmReviewDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class FilmReviewService {
  apiName = 'Default';
  

  create = (input: CreateUpdateFilmReviewDto) =>
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
  

  getCurrentUserFilmReview = () =>
    this.restService.request<any, UserFilmReviewDto[]>({
      method: 'GET',
      url: '/api/app/film-review/current-user-film-review',
    },
    { apiName: this.apiName });
  

  getFilmReviewsInfoByRequest = (request: GetFilmReviewDto) =>
    this.restService.request<any, FilmReviewsInfoDto>({
      method: 'GET',
      url: '/api/app/film-review/film-reviews-info',
      params: { filmId: request.filmId },
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<FilmReviewDto>>({
      method: 'GET',
      url: '/api/app/film-review',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });
  

  postLeaveReviewByRequest = (request: LeaveReviewDto) =>
    this.restService.request<any, FilmReviewDto>({
      method: 'POST',
      url: '/api/app/film-review/leave-review',
      body: request,
    },
    { apiName: this.apiName });
  

  postLeaveScoreByRequest = (request: LeaveScoreDto) =>
    this.restService.request<any, FilmReviewDto>({
      method: 'POST',
      url: '/api/app/film-review/leave-score',
      body: request,
    },
    { apiName: this.apiName });
  

  update = (id: number, input: CreateUpdateFilmReviewDto) =>
    this.restService.request<any, FilmReviewDto>({
      method: 'PUT',
      url: `/api/app/film-review/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
