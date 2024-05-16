import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionGuard } from '@guards';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule],
  providers: [SessionGuard],
})
export class AdminModule {}
