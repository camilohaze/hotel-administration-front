import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './modals/spinner/spinner.component';
import { SessionTimeoutComponent } from './modals/session-timeout/session-timeout.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';

import { NotifyInfoComponent } from './snackbars/notify-info/notify-info.component';
import { NotifySuccessComponent } from './snackbars/notify-success/notify-success.component';
import { NotifyWarningComponent } from './snackbars/notify-warning/notify-warning.component';
import { NotifyErrorComponent } from './snackbars/notify-error/notify-error.component';

import { LoginComponent } from './login/login.component';

import { NewCityComponent } from './cities/new-city/new-city.component';
import { EditCityComponent } from './cities/edit-city/edit-city.component';

import { NewDocumentTypeComponent } from './document-types/new-document-type/new-document-type.component';
import { EditDocumentTypeComponent } from './document-types/edit-document-type/edit-document-type.component';

import { NewGenderComponent } from './genders/new-gender/new-gender.component';
import { EditGenderComponent } from './genders/edit-gender/edit-gender.component';

import { NewHotelComponent } from './hotels/new-hotel/new-hotel.component';
import { EditHotelComponent } from './hotels/edit-hotel/edit-hotel.component';

import { NewRoomTypeComponent } from './room-types/new-room-type/new-room-type.component';
import { EditRoomTypeComponent } from './room-types/edit-room-type/edit-room-type.component';

import { SearchbarComponent } from './home/searchbar/searchbar.component';
import { RoomComponent } from './room/room.component';
import { BookingsComponent } from './modals/bookings/bookings.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpinnerComponent,
    SessionTimeoutComponent,
    ConfirmComponent,
    NotifyInfoComponent,
    NotifySuccessComponent,
    NotifyWarningComponent,
    NotifyErrorComponent,
    LoginComponent,
    NewCityComponent,
    EditCityComponent,
    NewDocumentTypeComponent,
    EditDocumentTypeComponent,
    NewGenderComponent,
    EditGenderComponent,
    NewHotelComponent,
    EditHotelComponent,
    NewRoomTypeComponent,
    EditRoomTypeComponent,
    SearchbarComponent,
    RoomComponent,
    BookingsComponent,
  ],
  exports: [
    SpinnerComponent,
    SessionTimeoutComponent,
    ConfirmComponent,
    NotifyInfoComponent,
    NotifySuccessComponent,
    NotifyWarningComponent,
    NotifyErrorComponent,
    LoginComponent,
    NewCityComponent,
    EditCityComponent,
    NewDocumentTypeComponent,
    EditDocumentTypeComponent,
    NewGenderComponent,
    EditGenderComponent,
    NewHotelComponent,
    EditHotelComponent,
    NewRoomTypeComponent,
    EditRoomTypeComponent,
    SearchbarComponent,
    RoomComponent,
    BookingsComponent,
  ],
})
export class ComponentsModule {}
