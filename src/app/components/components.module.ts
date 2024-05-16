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

import { NewHotelComponent } from './hotels/new-hotel/new-hotel.component';
import { EditHotelComponent } from './hotels/edit-hotel/edit-hotel.component';

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
    NewHotelComponent,
    EditHotelComponent,
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
    NewHotelComponent,
    EditHotelComponent,
    SearchbarComponent,
    RoomComponent,
    BookingsComponent,
  ],
})
export class ComponentsModule {}
