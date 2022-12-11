import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeLeptonXModule } from '@abp/ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@abp/ng.theme.lepton-x/layouts';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { ActorComponent } from './actor/actor.component';
import { ActorDialogComponent } from './actor/actor-dialog/actor-dialog.component';
import { SharedModule } from './shared/shared.module';
import { FilmReviewsComponent } from './film-reviews/film-reviews.component';
import { FilmReviewsDialogComponent } from './film-reviews/film-reviews-dialog/film-reviews-dialog.component';
import { FilmCastComponent } from './film-cast/film-cast.component';
import { FilmCastDialogComponent } from './film-cast/film-cast-dialog/film-cast-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeLeptonXModule.forRoot(),
    SideMenuLayoutModule.forRoot(),
    SharedModule,
  ],
  declarations: [
    AppComponent,
    ActorComponent,
    ActorDialogComponent,
    FilmReviewsComponent,
    FilmReviewsDialogComponent,
    FilmCastComponent,
    FilmCastDialogComponent,
  ],
  providers: [APP_ROUTE_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
