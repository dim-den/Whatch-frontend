import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        name: 'WhatchStructure',
        iconClass: 'fas fa-book',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/films',
        name: 'Films',
        parentName: 'WhatchStructure',
        layout: eLayoutType.application,
      },
      {
        path: '/actors',
        name: 'Actors',
        parentName: 'WhatchStructure',
        layout: eLayoutType.application,
      },
      {
        path: '/film-review',
        name: 'Reviews',
        parentName: 'WhatchStructure',
        layout: eLayoutType.application,
      },
      {
        path: '/film-cast',
        name: 'Casts',
        parentName: 'WhatchStructure',
        layout: eLayoutType.application,
      },
    ]);
  };
}
