import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QueryParamsGuard } from '@guards';

import { CitiesComponent } from './cities.component';
import { NewCityComponent } from './new-city/new-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';

const routes: Routes = [
  {
    path: '',
    component: CitiesComponent,
  },
  {
    path: 'new',
    component: NewCityComponent
  },
  {
    path: 'edit',
    component: EditCityComponent,
    canActivate: [QueryParamsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitiesRoutingModule {}
