import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilmDto } from '@proxy/dto';
import { filmGenreOptions } from '@proxy/enums';

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
      trailerUrl: [this.data?.trailerUrl, this.youtubeValidator()],
    });
  }

  youtubeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (!value) {
        return null;
      }

      return value.startsWith('https://www.youtube.com/embed/')
        ? null
        : { wrongUrl: 'Not valid youtube video link' };
    };
  }
}
