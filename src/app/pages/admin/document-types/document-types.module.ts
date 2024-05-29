import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryParamsGuard } from '@guards';

import { DocumentTypesRoutingModule } from './document-types-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DocumentTypesRoutingModule],
  providers: [QueryParamsGuard]
})
export class DocumentTypesModule {}
