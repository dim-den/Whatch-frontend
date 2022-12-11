import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ActorDto, CreateUpdateActorDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  apiName = 'Default';
  

  create = (input: CreateUpdateActorDto) =>
    this.restService.request<any, ActorDto>({
      method: 'POST',
      url: '/api/app/actor',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/actor/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ActorDto>({
      method: 'GET',
      url: `/api/app/actor/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ActorDto>>({
      method: 'GET',
      url: '/api/app/actor',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });
  

  update = (id: number, input: CreateUpdateActorDto) =>
    this.restService.request<any, ActorDto>({
      method: 'PUT',
      url: `/api/app/actor/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
