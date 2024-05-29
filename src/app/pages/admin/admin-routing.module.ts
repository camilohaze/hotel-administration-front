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
        path: 'cities',
        loadChildren: () =>
          import('./cities/cities.module').then((p) => p.CitiesModule),
        canActivate: [SessionGuard],
      },
      {
        path: 'document-types',
        loadChildren: () =>
          import('./document-types/document-types.module').then(
            (p) => p.DocumentTypesModule
          ),
        canActivate: [SessionGuard],
      },
      {
        path: 'genders',
        loadChildren: () =>
          import('./genders/genders.module').then((p) => p.GendersModule),
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
      {
        path: 'room-types',
        loadChildren: () =>
          import('./room-types/room-types.module').then((p) => p.RoomTypesModule),
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
