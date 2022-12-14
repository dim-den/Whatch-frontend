import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateFilmCastDto, FilmCastDto, FilmCastInfoDto, FilmDto, GetActorFilmsDto, GetFilmCastDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class FilmCastService {
  apiName = 'Default';
  

  create = (input: CreateUpdateFilmCastDto) =>
    this.restService.request<any, FilmCastDto>({
      method: 'POST',
      url: '/api/app/film-cast',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/film-cast/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, FilmCastDto>({
      method: 'GET',
      url: `/api/app/film-cast/${id}`,
    },
    { apiName: this.apiName });
  

  getActorFilmsByRequest = (request: GetActorFilmsDto) =>
    this.restService.request<any, FilmDto[]>({
      method: 'GET',
      url: '/api/app/film-cast/actor-films',
      params: { actorId: request.actorId },
    },
    { apiName: this.apiName });
  

  getFilmCastByRequest = (request: GetFilmCastDto) =>
    this.restService.request<any, FilmCastInfoDto[]>({
      method: 'GET',
      url: '/api/app/film-cast/film-cast',
      params: { filmId: request.filmId },
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<FilmCastDto>>({
      method: 'GET',
      url: '/api/app/film-cast',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });
  

  update = (id: number, input: CreateUpdateFilmCastDto) =>
    this.restService.request<any, FilmCastDto>({
      method: 'PUT',
      url: `/api/app/film-cast/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
