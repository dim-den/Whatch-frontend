import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { FilmSearchComponent } from './film-search.component';

@NgModule({
  declarations: [FilmSearchComponent],
  imports: [CommonModule, SharedModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  exports: [FilmSearchComponent],
})
export class FilmSearchModule {}
