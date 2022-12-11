import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filmGenreOptions } from '@proxy/enums';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActorDto, FilmDto } from '@proxy/dto';

@Component({
  selector: 'app-actor-dialog',
  templateUrl: './actor-dialog.component.html',
  styleUrls: ['./actor-dialog.component.scss'],
})
export class ActorDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: ActorDto) {}

  ngOnInit(): void {
    this.buildForm();
    this.form.updateValueAndValidity();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.data?.name, Validators.required],
      lastname: [this.data?.lastname, Validators.required],
      country: [this.data?.country, Validators.required],
      birthday: [this.data?.birthday, Validators.required],
    });
  }
}
