import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import 'moment/locale/es';

import { EventData } from '@class';
import { Gender, DocumentType, BookingEvent } from '@interfaces';
import { EventBusService } from '@services';

export const FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

moment.localeData('es');

@Component({
  selector: 'cmp-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: FORMATS },
  ],
})
export class BookingsComponent implements OnInit {
  public genders: Gender[] = [];
  public documentTypes: DocumentType[] = [];
  public booking: BookingEvent;

  public form = new FormGroup({
    hotelId: new FormControl(0, []),
    roomId: new FormControl(0, []),
    checkin: new FormControl('', []),
    checkout: new FormControl('', []),
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    total: new FormControl(0, []),
    guests: this.formBuilder.array([
      this.formBuilder.group({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        documentTypeId: new FormControl('', [Validators.required]),
        document: new FormControl('', [Validators.required]),
        genderId: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required]),
        bookingId: new FormControl(0, []),
      }),
    ]),
  });

  get guests() {
    return this.form.controls['guests'] as FormArray;
  }

  get passengers() {
    return this.booking.passengers;
  }

  private eventBusService: EventBusService = inject(EventBusService);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookingsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: BookingEvent
  ) {
    this.booking = data;
    this.documentTypes = data.documentTypes;
    this.genders = data.genders;
  }

  public ngOnInit(): void {
    this.form.patchValue(this.booking);

    for (let i = 1; i<this.passengers; i++) {
      this.addGuest();
    }
  }

  public addGuest(): void {
    const guest = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      documentTypeId: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      genderId: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      bookingId: new FormControl(0, []),
    });

    this.guests.push(guest);
  }

  public deleteGuest(index: number): void {
    this.guests.removeAt(index);
  }

  public onlyNumbers(event: any): boolean {
    if (!/^[0-9]$/i.test(event.key)) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  public onGoBack(): void {
    this.dialogRef.close();
  }

  public onSumbit(): void {
    if (this.form.valid) {
      this.eventBusService.emit(new EventData('new-booking', this.form.value));
    }
  }
}
