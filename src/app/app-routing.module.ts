import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorPageComponent } from './actor-page/actor-page.component';
import { ActorComponent } from './actor/actor.component';
import { FilmCastComponent } from './film-cast/film-cast.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { FilmReviewsComponent } from './film-reviews/film-reviews.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('@abp/ng.account').then(m =>
        m.AccountModule.forLazy({
          isPersonalSettingsChangedConfirmationActive: false,
        })
      ),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  { path: 'films', loadChildren: () => import('./film/film.module').then(m => m.FilmModule) },
  {
    path: 'actors',
    component: ActorComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'film-review',
    component: FilmReviewsComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'film-cast',
    component: FilmCastComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'film/:filmId',
    component: FilmPageComponent,
  },
  {
    path: 'actor/:actorId',
    component: ActorPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
