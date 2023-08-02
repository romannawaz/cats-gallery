import { Route } from '@angular/router';

export const appRoute: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@app/cats/page/cats/cats.component').then((c) => c.CatsComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
