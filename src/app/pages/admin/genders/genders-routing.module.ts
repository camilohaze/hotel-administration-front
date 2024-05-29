import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QueryParamsGuard } from '@guards';

import { GendersComponent } from './genders.component';
import { NewGenderComponent } from './new-gender/new-gender.component';
import { EditGenderComponent } from './edit-gender/edit-gender.component';

const routes: Routes = [
  {
    path: '',
    component: GendersComponent,
  },
  {
    path: 'new',
    component: NewGenderComponent
  },
  {
    path: 'edit',
    component: EditGenderComponent,
    canActivate: [QueryParamsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GendersRoutingModule {}
