import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  FilmCastInfoDto,
  FilmDto,
  FilmReviewInfoDto,
  FilmReviewsInfoDto,
  UserWatchlistDto,
} from '@proxy/dto';
import { filmGenreOptions } from '@proxy/enums';
import { FilmCastService, FilmReviewService, FilmService, WatchlistService } from '@proxy/services';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError, tap } from 'rxjs';
import { LeaveReviewDialogComponent } from './leave-review-dialog/leave-review-dialog.component';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss'],
})
export class FilmPageComponent implements OnInit {
  film: FilmDto;
  reviews: FilmReviewsInfoDto;
  cast: FilmCastInfoDto[];
  watchlist: UserWatchlistDto;

  usersAvgScore = null;
  currentUserScore: number = null;

  scoreArr: number[] = [...Array(10).keys()].map(x => x + 1);

  filmGenres = filmGenreOptions;
  getGenreName(genre: number): string {
    return this.filmGenres.find(x => x.value == genre)?.key;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private castService: FilmCastService,
    private reviewService: FilmReviewService,
    private watchlistService: WatchlistService,
    private sanitizer: DomSanitizer,
    private oAuthService: OAuthService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.route.paramMap
      .pipe(tap((params: ParamMap) => this.load(params.get('filmId'))))
      .subscribe();
  }

  ngOnInit(): void {}

  trailerUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.film?.trailerUrl);
  }

  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  load(id: any): void {
    this.filmService
      .get(id)
      .pipe(catchError(() => this.router.navigate([''])))
      .subscribe(x => (this.film = x as FilmDto));

    this.loadReview(id);
    this.loadFilmCast(id);
    this.hasLoggedIn && this.loadWatchlist(id);
  }

  loadReview(filmId: number) {
    this.reviewService.getFilmReviewsInfoByRequest({ filmId }).subscribe(x => {
      this.reviews = x;
      this.usersAvgScore = x.avgScore;
      this.currentUserScore = x.currentUserFilmScore;
    });
  }

  loadFilmCast(filmId: number) {
    this.castService.getFilmCastByRequest({ filmId }).subscribe(x => {
      this.cast = x;
    });
  }

  loadWatchlist(filmId: number) {
    this.hasLoggedIn &&
      this.watchlistService.getUserWatchlistForFilmByFilmId(filmId).subscribe(x => {
        this.watchlist = x;
      });
  }

  reviewsWithText(): FilmReviewInfoDto[] {
    return this.reviews?.reviews.filter(x => x.review);
  }

  showIcon(index: number) {
    if ((this.currentUserScore ?? this.usersAvgScore ?? 0) >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  getAge(bday: string) {
    const birthday = new Date(bday);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  addToWatchList() {
    this.watchlistService
      .postUpdateOrDeleteFromListByFilmId(this.film.id)
      .pipe(tap(() => this.loadWatchlist(this.film.id)))
      .subscribe();
  }

  addFilmReview() {
    const dialogRef = this.dialog.open(LeaveReviewDialogComponent, {
      data: {
        title: this.film.title,
        review: this.reviews.currentUserFilmReview,
        score: this.currentUserScore,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService
          .postLeaveReviewByRequest({
            filmId: this.film.id,
            score: result.score,
            review: result.review,
          })
          .subscribe(() => {
            this.loadReview(this.film.id);
          });
      }
    });
  }

  onScoreClick(score: number) {
    if (this.hasLoggedIn) {
      this.currentUserScore = score;

      this.reviewService
        .postLeaveScoreByRequest({ filmId: this.film.id, score })
        .pipe(tap(() => this.loadReview(this.film.id)))
        .subscribe();
    } else {
      this.login();
    }
  }

  login() {
    this.authService.navigateToLogin();
  }
}
