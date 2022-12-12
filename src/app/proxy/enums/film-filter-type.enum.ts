import { mapEnumToOptions } from '@abp/ng.core';

export enum FilmFilterType {
  AllFields = 0,
  ByTitle = 1,
  ByActor = 2,
  ByGenre = 3,
}

export const filmFilterTypeOptions = mapEnumToOptions(FilmFilterType);
