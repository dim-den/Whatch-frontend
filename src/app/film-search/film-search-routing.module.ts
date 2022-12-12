import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmSearchComponent } from './film-search.component';

const routes: Routes = [{ path: '', component: FilmSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmSearchModule {}
