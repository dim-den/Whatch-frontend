import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateFilmCastDto, FilmCastDto } from '../dto/models';

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
