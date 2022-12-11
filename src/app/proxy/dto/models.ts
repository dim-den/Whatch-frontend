import type { AuditedEntityDto, EntityDto } from '@abp/ng.core';
import type { FilmGenre } from '../enums/film-genre.enum';

export interface ActorDto extends EntityDto<number> {
  name?: string;
  lastname?: string;
  country?: string;
  birthday?: string;
}

export interface CreateUpdateActorDto {
  name: string;
  lastname: string;
  country: string;
  birthday: string;
}

export interface CreateUpdateFilmCastDto {
  roleName?: string;
  filmId: number;
  actorId: number;
}

export interface CreateUpdateFilmDto {
  title: string;
  description?: string;
  director?: string;
  budget: number;
  fees: number;
  realeaseDate: string;
  country: string;
  genre: FilmGenre;
  trailerUrl?: string;
}

export interface FilmCastDto extends AuditedEntityDto<number> {
  roleName?: string;
  filmId: number;
  actorId: number;
}

export interface FilmDto extends EntityDto<number> {
  title?: string;
  description?: string;
  director?: string;
  budget: number;
  fees: number;
  releaseDate?: string;
  country?: string;
  genre: FilmGenre;
  trailerUrl?: string;
}

export interface FilmReviewDto extends AuditedEntityDto<number> {
  review?: string;
  score: number;
  filmId: number;
  userId?: string;
}

export interface LeaveReviewDto {
  filmId: number;
  userId: string;
  score: number;
  review?: string;
}
