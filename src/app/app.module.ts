import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeLeptonXModule } from '@abp/ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@abp/ng.theme.lepton-x/layouts';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { BaseUiExtensionsModule } from '@abp/ng.theme.shared/extensions';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { ActorPageComponent } from './actor-page/actor-page.component';
import { ActorDialogComponent } from './actor/actor-dialog/actor-dialog.component';
import { ActorComponent } from './actor/actor.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmCastDialogComponent } from './film-cast/film-cast-dialog/film-cast-dialog.component';
import { FilmCastComponent } from './film-cast/film-cast.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { LeaveReviewDialogComponent } from './film-page/leave-review-dialog/leave-review-dialog.component';
import { FilmReviewsDialogComponent } from './film-reviews/film-reviews-dialog/film-reviews-dialog.component';
import { FilmReviewsComponent } from './film-reviews/film-reviews.component';
import { FilmSearchModule } from './film-search/film-search.module';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { SharedModule } from './shared/shared.module';

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
    FilmSearchModule,
    BaseUiExtensionsModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatListModule,
  ],
  declarations: [
    AppComponent,
    ActorComponent,
    ActorDialogComponent,
    FilmReviewsComponent,
    FilmReviewsDialogComponent,
    FilmCastComponent,
    FilmCastDialogComponent,
    FilmPageComponent,
    LeaveReviewDialogComponent,
    ActorPageComponent,
  ],
  providers: [APP_ROUTE_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
