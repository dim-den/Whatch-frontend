import { NgModule } from '@angular/core';
import { FilmSearchModule } from '../film-search/film-search.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, FilmSearchModule],
})
export class HomeModule {}
