import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FilmDto } from '@proxy/dto';
import { filmGenreOptions } from '@proxy/enums';
import { FilmService } from '@proxy/services';
import { FilmDialogComponent } from './film-dialog';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  providers: [ListService],
})
export class FilmComponent implements OnInit {
  films: PagedResultDto<FilmDto> = { items: [], totalCount: 0 };

  filmGenres = filmGenreOptions;
  getGenreName(genre: number): string {
    return this.filmGenres.find(x => x.value == genre).key;
  }

  columns: string[] = [
    'actions',
    'title',
    'description',
    'director',
    'budget',
    'fees',
    'releaseDate',
    'country',
    'genre',
    'trailerUrl',
  ];

  changePage(pageEvent: PageEvent) {
    this.list.page = pageEvent.pageIndex;
  }

  changeSort(sort: Sort) {
    this.list.sortKey = sort.active;
    this.list.sortOrder = sort.direction;
  }

  constructor(
    public readonly list: ListService,
    private filmService: FilmService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const filmStreamCreator = query => this.filmService.getList(query);

    this.list.hookToQuery(filmStreamCreator).subscribe(x => (this.films = x));
  }

  createFilm() {
    const dialogRef = this.dialog.open(FilmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filmService.create(result).subscribe(() => {
          this.list.get();
        });
      }
    });
  }

  editFilm(id: any) {
    this.filmService.get(id).subscribe(film => {
      const dialogRef = this.dialog.open(FilmDialogComponent, {
        data: film,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.filmService.update(id, result).subscribe(() => {
            this.list.get();
          });
        }
      });
    });
  }

  deleteFilm(id: number) {
    this.filmService.delete(id).subscribe(() => this.list.get());
  }
}
