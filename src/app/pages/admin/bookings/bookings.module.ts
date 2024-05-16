import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryParamsGuard } from '@guards';

import { BookingsRoutingModule } from './bookings-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookingsRoutingModule
  ],
  providers: [QueryParamsGuard]
})
export class BookingsModule { }
