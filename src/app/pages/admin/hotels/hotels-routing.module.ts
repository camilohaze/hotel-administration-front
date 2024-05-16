import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QueryParamsGuard } from '@guards';

import { HotelsComponent } from './hotels.component';
import { NewHotelComponent } from './new-hotel/new-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: HotelsComponent,
  },
  {
    path: 'new',
    component: NewHotelComponent
  },
  {
    path: 'edit',
    component: EditHotelComponent,
    canActivate: [QueryParamsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
