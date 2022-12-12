import { PagedResultDto } from '@abp/ng.core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilmDto } from '@proxy/dto';
import { FilmFilterType, filmGenreOptions } from '@proxy/enums';
import { SearchService } from '@proxy/services';
import { debounceTime, filter, Observable, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.scss'],
})
export class FilmSearchComponent {
  films$: Subject<FilmDto[]> = new Subject<FilmDto[]>();
  filterCtrl: FormControl<string>;
  filterByCtrl: FormControl<FilmFilterType>;

  form: FormGroup;

  filmGenres = filmGenreOptions;
  getGenreName(genre: number): string {
    return this.filmGenres.find(x => x.value == genre).key;
  }

  filterOptions: { value: FilmFilterType; viewValue: string }[] = [
    { value: FilmFilterType.AllFields, viewValue: 'All fields' },
    { value: FilmFilterType.ByTitle, viewValue: 'Title' },
    { value: FilmFilterType.ByActor, viewValue: 'Actor' },
    { value: FilmFilterType.ByGenre, viewValue: 'Genre' },
  ];

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.initForm();
  }

  initForm() {
    this.filterCtrl = this.fb.control(null);
    this.filterByCtrl = this.fb.control(FilmFilterType.AllFields);

    this.form = this.fb.group({
      filterCtrl: this.filterCtrl,
      filterByCtrl: this.filterByCtrl,
    });

    this.filterCtrl.valueChanges
      .pipe(
        debounceTime(500),
        filter(x => !!x),
        switchMap(key => this.searchByFilters(key, this.filterByCtrl.value))
      )
      .pipe(tap(x => this.films$.next(x.items)))
      .subscribe();

    this.filterByCtrl.valueChanges
      .pipe(
        filter(() => !!this.filterCtrl.value),
        switchMap(key => this.searchByFilters(this.filterCtrl.value, this.filterByCtrl.value))
      )
      .pipe(tap(x => this.films$.next(x.items)))
      .subscribe();
  }

  private searchByFilters(
    key: string,
    filterBy: FilmFilterType,
    maxResultCount = 5
  ): Observable<PagedResultDto<FilmDto>> {
    return this.searchService.getSearchFilmByRequest({
      maxResultCount: 5,
      key,
      filterBy,
    });
  }
}
