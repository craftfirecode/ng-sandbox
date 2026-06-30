import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/index/index').then((m) => m.Index),
  },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about').then((m) => m.About),
  },
];
