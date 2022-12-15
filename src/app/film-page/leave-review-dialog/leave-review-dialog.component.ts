import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface LeaveReviewDialog {
  score: number;
  review: string;
  title: string;
  reviewOptionable?: boolean;
}

@Component({
  selector: 'app-leave-review-dialog',
  templateUrl: './leave-review-dialog.component.html',
  styleUrls: ['./leave-review-dialog.component.scss'],
})
export class LeaveReviewDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: LeaveReviewDialog) {}

  ngOnInit(): void {
    this.buildForm();
    this.form.markAsPristine();
  }

  buildForm() {
    this.form = this.fb.group({
      score: [this.data?.score, [Validators.required, Validators.min(1), Validators.max(10)]],
      review: [
        this.data?.review,
        this.data?.reviewOptionable
          ? []
          : [Validators.required, Validators.minLength(10), Validators.maxLength(2048)],
      ],
    });
  }
}
