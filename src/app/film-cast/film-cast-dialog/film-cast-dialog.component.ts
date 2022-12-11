import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FilmDto, FilmCastDto, ActorDto } from '@proxy/dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActorService, FilmService } from '@proxy/services';

@Component({
  selector: 'app-film-cast-dialog',
  templateUrl: './film-cast-dialog.component.html',
  styleUrls: ['./film-cast-dialog.component.scss'],
})
export class FilmCastDialogComponent implements OnInit {
  form: FormGroup;

  films$: Observable<FilmDto[]>;
  actors$: Observable<ActorDto[]>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FilmCastDto,
    filmService: FilmService,
    actorService: ActorService
  ) {
    this.films$ = filmService.getList({ maxResultCount: 1000 }).pipe(map(r => r.items));
    this.actors$ = actorService.getList({ maxResultCount: 1000 }).pipe(map(r => r.items));
  }

  ngOnInit(): void {
    this.buildForm();
    this.form.updateValueAndValidity();
  }

  buildForm() {
    this.form = this.fb.group({
      roleName: [this.data?.roleName, [Validators.required]],
      filmId: [this.data?.filmId, [Validators.required]],
      actorId: [this.data?.actorId, [Validators.required]],
    });
  }
}
