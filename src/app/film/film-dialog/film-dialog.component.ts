import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmGenre, filmGenreOptions } from '@proxy/enums';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilmDto } from '@proxy/dto';

@Component({
  selector: 'app-film-dialog',
  templateUrl: './film-dialog.component.html',
  styleUrls: ['./film-dialog.component.scss'],
})
export class FilmDialogComponent implements OnInit {
  form: FormGroup;

  filmGenres = filmGenreOptions;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: FilmDto) {}

  ngOnInit(): void {
    this.buildForm();
    this.form.updateValueAndValidity();
  }

  buildForm() {
    this.form = this.fb.group({
      title: [this.data?.title, Validators.required],
      description: [this.data?.description, Validators.required],
      director: [this.data?.director, Validators.required],
      budget: [this.data?.budget],
      fees: [this.data?.fees],
      releaseDate: [this.data?.releaseDate, Validators.required],
      country: [this.data?.country, Validators.required],
      genre: [this.data?.genre, Validators.required],
      trailerUrl: [this.data?.trailerUrl],
    });
  }
}
