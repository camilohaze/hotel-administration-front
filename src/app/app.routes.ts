import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(p => p.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(p => p.AdminModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(p => p.NotFoundModule)
  },
];
