import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryParamsGuard } from '@guards';

import { HotelsRoutingModule } from './hotels-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HotelsRoutingModule],
  providers: [QueryParamsGuard]
})
export class HotelsModule {}
