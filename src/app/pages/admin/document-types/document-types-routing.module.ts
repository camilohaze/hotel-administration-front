import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QueryParamsGuard } from '@guards';

import { DocumentTypesComponent } from './document-types.component';
import { NewDocumentTypeComponent } from './new-document-type/new-document-type.component';
import { EditDocumentTypeComponent } from './edit-document-type/edit-document-type.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentTypesComponent,
  },
  {
    path: 'new',
    component: NewDocumentTypeComponent
  },
  {
    path: 'edit',
    component: EditDocumentTypeComponent,
    canActivate: [QueryParamsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentTypesRoutingModule {}
