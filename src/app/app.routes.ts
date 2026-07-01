import { Routes } from '@angular/router';
import { authGuard } from '@/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/index/index').then((m) => m.Index),
  },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about').then((m) => m.About),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard], // Schützt das Dashboard
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component').then((m) => m.LoginComponent),
  },
];
