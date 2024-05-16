import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SessionGuard } from '@guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((p) => p.LoginModule),
        canActivate: [SessionGuard],
      },
      {
        path: 'hotels',
        loadChildren: () =>
          import('./hotels/hotels.module').then((p) => p.HotelsModule),
        canActivate: [SessionGuard],
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('./bookings/bookings.module').then((p) => p.BookingsModule),
        canActivate: [SessionGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
