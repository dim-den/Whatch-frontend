import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FilmReviewDto } from '@proxy/dto';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FilmReviewService } from '@proxy/services';
import { MatDialog } from '@angular/material/dialog';
import { FilmReviewsDialogComponent } from './film-reviews-dialog/film-reviews-dialog.component';

@Component({
  selector: 'app-film-reviews',
  templateUrl: './film-reviews.component.html',
  styleUrls: ['./film-reviews.component.scss'],
  providers: [ListService],
})
export class FilmReviewsComponent implements OnInit {
  filmReviews: PagedResultDto<FilmReviewDto> = { items: [], totalCount: 0 };

  columns: string[] = ['actions', 'score', 'review', 'userId', 'filmId'];

  changePage(pageEvent: PageEvent) {
    this.list.page = pageEvent.pageIndex;
  }

  changeSort(sort: Sort) {
    this.list.sortKey = sort.active;
    this.list.sortOrder = sort.direction;
  }

  constructor(
    public readonly list: ListService,
    private filmReviewService: FilmReviewService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const filmReviewStreamCreator = query => this.filmReviewService.getList(query);

    this.list.hookToQuery(filmReviewStreamCreator).subscribe(x => (this.filmReviews = x));
  }

  createFilmReview() {
    const dialogRef = this.dialog.open(FilmReviewsDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filmReviewService.create(result).subscribe(() => {
          this.list.get();
        });
      }
    });
  }

  editFilmReview(id: any) {
    this.filmReviewService.get(id).subscribe(filmReview => {
      const dialogRef = this.dialog.open(FilmReviewsDialogComponent, {
        data: filmReview,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.filmReviewService.update(id, result).subscribe(() => {
            this.list.get();
          });
        }
      });
    });
  }

  deleteFilmReview(id: number) {
    this.filmReviewService.delete(id).subscribe(() => this.list.get());
  }
}
