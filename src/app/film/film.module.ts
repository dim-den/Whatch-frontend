import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { FilmComponent } from './film.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmDialogComponent } from './film-dialog/film-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [FilmComponent, FilmDialogComponent],
  imports: [
    CommonModule,
    FilmRoutingModule,
    NgbDatepickerModule,
    SharedModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
  ],
})
export class FilmModule {}
