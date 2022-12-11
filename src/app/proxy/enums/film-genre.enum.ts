import { mapEnumToOptions } from '@abp/ng.core';

export enum FilmGenre {
  Action = 1,
  Adventure = 2,
  Comedy = 3,
  Drama = 4,
  Fantasy = 5,
  Horror = 6,
  Musicals = 7,
  Mystery = 8,
  Romance = 9,
  ScienceFiction = 10,
  Sports = 11,
  Thriller = 12,
  Western = 13,
}

export const filmGenreOptions = mapEnumToOptions(FilmGenre);
