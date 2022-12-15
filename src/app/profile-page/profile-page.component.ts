import { ConfigStateService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { UserFilmReviewDto, UserWatchlistDto } from '@proxy/dto';
import { filmGenreOptions } from '@proxy/enums';
import { FilmReviewService, WatchlistService } from '@proxy/services';
import { tap } from 'rxjs';
import { LeaveReviewDialogComponent } from '../film-page/leave-review-dialog/leave-review-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  wacthlist: UserWatchlistDto[] = [];
  user;
  filmReviews: UserFilmReviewDto[] = [];
  sortedFilmReviews: UserFilmReviewDto[];

  filmReviewColumns: string[] = ['title', 'genre', 'score', 'creationTime', 'actions'];
  filmGenres = filmGenreOptions;
  getGenreName(genre: number): string {
    return this.filmGenres.find(x => x.value == genre).key;
  }

  get avgScore(): number {
    return (
      this.filmReviews?.map(x => x.score).reduce((a, b) => a + b, 0) / this.filmReviews?.length
    );
  }
  constructor(
    private watchlistService: WatchlistService,
    private filmReviewService: FilmReviewService,
    private configState: ConfigStateService,
    public dialog: MatDialog
  ) {
    this.watchlistService.getUserWatchlist().subscribe(x => (this.wacthlist = x));
    this.user = this.configState.getOne('currentUser');
    this.filmReviewService.getCurrentUserFilmReview().subscribe(x => {
      this.filmReviews = x;
      this.sortedFilmReviews = x;
    });
  }

  removeFromWatchList(filmId) {
    this.watchlistService
      .postUpdateOrDeleteFromListByFilmId(filmId)
      .pipe(
        tap(() => this.watchlistService.getUserWatchlist().subscribe(x => (this.wacthlist = x)))
      )
      .subscribe();
  }

  addFilmReview(filmId: number, watchlist = true) {
    const film = (
      this.filmReviews.find(x => x.film.id === filmId) ??
      this.wacthlist.find(x => x.film.id === filmId)
    )?.film;
    const currentReview = this.filmReviews.find(x => x.film.id === filmId);

    const dialogRef = this.dialog.open(LeaveReviewDialogComponent, {
      data: {
        title: film?.title,
        review: currentReview?.review,
        score: currentReview?.score,
        reviewOptionable: true,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const request = result.review
          ? this.filmReviewService.postLeaveReviewByRequest({
              filmId: filmId,
              score: result.score,
              review: result.review,
            })
          : this.filmReviewService.postLeaveScoreByRequest({
              filmId: filmId,
              score: result.score,
            });

        request.subscribe(() => {
          watchlist && this.removeFromWatchList(filmId);
          this.watchlistService.getUserWatchlist().subscribe(x => (this.wacthlist = x));
          this.filmReviewService.getCurrentUserFilmReview().subscribe(x => {
            this.filmReviews = x;
            this.sortedFilmReviews = x.slice();
          });
        });
      }
    });
  }

  removeReview(id) {
    this.filmReviewService.delete(id).subscribe(() =>
      this.filmReviewService.getCurrentUserFilmReview().subscribe(x => {
        this.filmReviews = x;
        this.sortedFilmReviews = x;
      })
    );
  }

  sortData(sort: Sort) {
    const data = this.filmReviews.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedFilmReviews = data;
      return;
    }

    this.sortedFilmReviews = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.film.title, b.film.title, isAsc);
        case 'genre':
          return compare(a.film.genre, b.film.genre, isAsc);
        case 'score':
          return compare(a.score, b.score, isAsc);
        case 'creationTime':
          return compare(a.creationTime as string, b.creationTime as string, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
