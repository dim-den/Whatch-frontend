import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilmDto, FilmReviewInfoDto, FilmReviewsInfoDto } from '@proxy/dto';
import { filmGenreOptions } from '@proxy/enums';
import { FilmReviewService, FilmService } from '@proxy/services';
import { OAuthService } from 'angular-oauth2-oidc';
import { tap } from 'rxjs';
import { LeaveReviewDialogComponent } from './leave-review-dialog/leave-review-dialog.component';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss'],
})
export class FilmPageComponent implements OnInit {
  film: FilmDto;
  reviews: FilmReviewsInfoDto;

  usersAvgScore = 6.25;
  currentUserScore: number = null;

  scoreArr: number[] = [...Array(10).keys()].map(x => x + 1);

  filmGenres = filmGenreOptions;
  getGenreName(genre: number): string {
    return this.filmGenres.find(x => x.value == genre)?.key;
  }

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private reviewService: FilmReviewService,
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
    this.filmService.get(id).subscribe(x => (this.film = x));

    this.loadReview(id);
  }

  loadReview(filmId: number) {
    this.reviewService.getFilmReviewsInfoByRequest({ filmId }).subscribe(x => {
      this.reviews = x;
      this.usersAvgScore = x.avgScore;
      this.currentUserScore = x.currentUserFilmScore;
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
