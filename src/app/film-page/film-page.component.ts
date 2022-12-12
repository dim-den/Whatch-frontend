import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilmDto } from '@proxy/dto';
import { filmGenreOptions } from '@proxy/enums';
import { FilmService } from '@proxy/services';
import { tap } from 'rxjs';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss'],
})
export class FilmPageComponent {
  film: FilmDto;

  filmGenres = filmGenreOptions;
  getGenreName(genre: number): string {
    return this.filmGenres.find(x => x.value == genre)?.key;
  }

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private sanitizer: DomSanitizer
  ) {
    this.route.paramMap
      .pipe(tap((params: ParamMap) => this.load(params.get('filmId'))))
      .subscribe();
  }

  trailerUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.film?.trailerUrl);
  }

  load(id: any): void {
    this.filmService.get(id).subscribe(x => (this.film = x));
  }
}
