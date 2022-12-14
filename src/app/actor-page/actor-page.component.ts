import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActorDto, FilmDto } from '@proxy/dto';
import { ActorService, FilmCastService } from '@proxy/services';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.scss'],
})
export class ActorPageComponent {
  actor: ActorDto;
  actorFilms: FilmDto[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private castService: FilmCastService,
    private actorService: ActorService
  ) {
    this.route.paramMap
      .pipe(tap((params: ParamMap) => this.load(params.get('actorId'))))
      .subscribe();
  }

  load(id: any): void {
    this.actorService
      .get(id)
      .pipe(catchError(() => this.router.navigate([''])))
      .subscribe(x => (this.actor = x as ActorDto));

    this.loadActorFilms(id);
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

  loadActorFilms(actorId: number) {
    this.castService.getActorFilmsByRequest({ actorId }).subscribe(x => {
      this.actorFilms = x;
    });
  }
}
