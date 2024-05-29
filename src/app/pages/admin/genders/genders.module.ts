import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryParamsGuard } from '@guards';

import { GendersRoutingModule } from './genders-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GendersRoutingModule],
  providers: [QueryParamsGuard]
})
export class GendersModule {}
