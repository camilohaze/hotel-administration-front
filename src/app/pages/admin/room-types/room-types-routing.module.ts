import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QueryParamsGuard } from '@guards';

import { RoomTypesComponent } from './room-types.component';
import { NewRoomTypeComponent } from './new-room-type/new-room-type.component';
import { EditRoomTypeComponent } from './edit-room-type/edit-room-type.component';

const routes: Routes = [
  {
    path: '',
    component: RoomTypesComponent,
  },
  {
    path: 'new',
    component: NewRoomTypeComponent
  },
  {
    path: 'edit',
    component: EditRoomTypeComponent,
    canActivate: [QueryParamsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomTypesRoutingModule {}
