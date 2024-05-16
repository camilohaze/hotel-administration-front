import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import {
  CommonModule,
  registerLocaleData,
  CurrencyPipe,
  Location,
} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import localeCO from '@angular/common/locales/es-CO';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { SpinnerComponent } from '@components';
import { Booking, Guest } from '@interfaces';
import { BookingService, ModalService } from '@services';

registerLocaleData(localeCO);

@Component({
  selector: 'app-detail-booking',
  templateUrl: './detail-booking.component.html',
  styleUrl: './detail-booking.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    CurrencyPipe,
    BookingService,
  ],
})
export class DetailBookingComponent implements OnInit {
  public booking!: Booking;

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'documentType',
    'document',
    'gender',
    'email',
    'phone',
  ];
  public dataSource: Guest[] = [];

  private modalService: ModalService = inject(ModalService);
  private bookingService: BookingService = inject(BookingService);

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  public ngOnInit(): void {
    const { bookingId } = this.activatedRoute.snapshot.queryParams;

    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.bookingService.getById(bookingId).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.dataSource = booking.guests;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
  }

  public onGoBack(): void {
    this.location.back();
  }
}
