import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryParamsGuard } from '@guards';

import { RoomTypesRoutingModule } from './room-types-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RoomTypesRoutingModule],
  providers: [QueryParamsGuard]
})
export class RoomTypesModule {}
