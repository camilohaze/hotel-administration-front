import {
  Component,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CommonModule,
  registerLocaleData,
  CurrencyPipe,
} from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { Booking } from '@interfaces';
import { BookingService, ModalService, NotificationService } from '@services';
import {
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';

registerLocaleData(localeCO);

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    CurrencyPipe,
    BookingService,
  ],
})
export class BookingsComponent implements OnInit, OnDestroy {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public displayedColumns: string[] = [
    'hotel',
    'room',
    'checkin',
    'checkout',
    'total',
    'actions',
  ];
  public dataSource: MatTableDataSource<Booking> =
    new MatTableDataSource<Booking>([]);

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private bookingService: BookingService = inject(BookingService);

  private $subscription: Subscription[] = [];

  public ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.bookingService.getAll().subscribe({
      next: (bookings) => {
        this.dataSource = new MatTableDataSource<Booking>(bookings);
        this.dataSource.paginator = this.paginator;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
  }
}
