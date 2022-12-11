import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filmGenreOptions } from '@proxy/enums';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilmDto, FilmReviewDto } from '@proxy/dto';
import { map, Observable } from 'rxjs';
import { FilmService } from '@proxy/services';
import { IdentityUserDto, IdentityUserService } from '@abp/ng.identity/proxy';

@Component({
  selector: 'app-film-reviews-dialog',
  templateUrl: './film-reviews-dialog.component.html',
  styleUrls: ['./film-reviews-dialog.component.scss'],
})
export class FilmReviewsDialogComponent implements OnInit {
  form: FormGroup;

  films$: Observable<FilmDto[]>;
  users$: Observable<IdentityUserDto[]>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FilmReviewDto,
    filmService: FilmService,
    userService: IdentityUserService
  ) {
    this.films$ = filmService.getList({ maxResultCount: 1000 }).pipe(map(r => r.items));
    this.users$ = userService.getList({ maxResultCount: 1000 }).pipe(map(r => r.items));
  }

  ngOnInit(): void {
    this.buildForm();
    this.form.updateValueAndValidity();
  }

  buildForm() {
    this.form = this.fb.group({
      score: [this.data?.score, [Validators.required, Validators.min(1), Validators.max(10)]],
      review: [this.data?.review, Validators.required],
      filmId: [this.data?.filmId, Validators.required],
      userId: [this.data?.userId, Validators.required],
    });
  }
}
