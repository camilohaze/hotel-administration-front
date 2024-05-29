import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryParamsGuard } from '@guards';

import { CitiesRoutingModule } from './cities-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CitiesRoutingModule],
  providers: [QueryParamsGuard]
})
export class CitiesModule {}
