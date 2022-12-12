import { Component, OnInit } from '@angular/core';
import { CurrentUserDto, ListService, PagedResultDto } from '@abp/ng.core';
import { FilmCastDto } from '@proxy/dto';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FilmCastService } from '@proxy/services';
import { MatDialog } from '@angular/material/dialog';
import { FilmCastDialogComponent } from './film-cast-dialog/film-cast-dialog.component';

@Component({
  selector: 'app-film-cast',
  templateUrl: './film-cast.component.html',
  styleUrls: ['./film-cast.component.scss'],
  providers: [ListService],
})
export class FilmCastComponent implements OnInit {
  filmCasts: PagedResultDto<FilmCastDto> = { items: [], totalCount: 0 };

  columns: string[] = ['actions', 'roleName', 'filmId', 'actorId'];

  changePage(pageEvent: PageEvent) {
    this.list.page = pageEvent.pageIndex;
  }

  changeSort(sort: Sort) {
    this.list.sortKey = sort.active;
    this.list.sortOrder = sort.direction;
  }

  constructor(
    public readonly list: ListService,
    private filmCastService: FilmCastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const filmCastStreamCreator = query => this.filmCastService.getList(query);

    this.list.hookToQuery(filmCastStreamCreator).subscribe(x => (this.filmCasts = x));
  }

  createFilmCast() {
    const dialogRef = this.dialog.open(FilmCastDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filmCastService.create(result).subscribe(() => {
          this.list.get();
        });
      }
    });
  }

  editFilmCast(id: any) {
    this.filmCastService.get(id).subscribe(filmCast => {
      const dialogRef = this.dialog.open(FilmCastDialogComponent, {
        data: filmCast,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.filmCastService.update(id, result).subscribe(() => {
            this.list.get();
          });
        }
      });
    });
  }

  deleteFilmCast(id: number) {
    this.filmCastService.delete(id).subscribe(() => this.list.get());
  }
}
