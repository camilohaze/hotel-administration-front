import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QueryParamsGuard } from '@guards';

import { BookingsComponent } from './bookings.component';
import { DetailBookingComponent } from './detail-booking/detail-booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingsComponent,
  },
  {
    path: 'detail',
    component: DetailBookingComponent,
    canActivate: [QueryParamsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
