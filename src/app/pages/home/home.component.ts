import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import moment, { Moment } from 'moment';

import {
  ComponentsModule,
  BookingsComponent,
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';
import {
  Booking,
  BookingEvent,
  City,
  DocumentType,
  Gender,
  Room,
  SearchRoomsEvent,
} from '@interfaces';
import {
  ModalService,
  CityService,
  DocumentTypeService,
  GenderService,
  RoomService,
  EventBusService,
  BookingService,
  NotificationService,
} from '@services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [ComponentsModule],
  providers: [
    CityService,
    DocumentTypeService,
    GenderService,
    RoomService,
    BookingService,
  ],
})
export class HomeComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public cities: City[] = [];
  public documentTypes: DocumentType[] = [];
  public genders: Gender[] = [];
  public rooms: Room[] = [];
  public nights: number = 0;
  public checkin!: Moment;
  public checkout!: Moment;
  public passengers!: number;

  private ngZone: NgZone = inject(NgZone);
  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService = inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private cityService: CityService = inject(CityService);
  private documentTypeService: DocumentTypeService =
    inject(DocumentTypeService);
  private genderService: GenderService = inject(GenderService);
  private roomService: RoomService = inject(RoomService);
  private bookingService: BookingService = inject(BookingService);

  private $subscription: Subscription[] = [];

  constructor() {
    this.$subscriptions.push(
      this.eventBusService.on('search-rooms', (event: SearchRoomsEvent) => {
        this.ngZone.run(() => this.onSearchRooms(event));
      })
    );

    this.$subscriptions.push(
      this.eventBusService.on('booking', (event: BookingEvent) => {
        this.ngZone.run(() => this.onBooking(event));
      })
    );

    this.$subscriptions.push(
      this.eventBusService.on('new-booking', (booking: Booking) => {
        this.ngZone.run(() => this.onNewBooking(booking));
      })
    );
  }

  public ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    const requests = forkJoin({
      cities: this.cityService.getAll(),
      documentTypes: this.documentTypeService.getAll(),
      genders: this.genderService.getAll(),
    });

    requests.subscribe({
      next: ({ cities, documentTypes, genders }) => {
        this.cities = cities;
        this.documentTypes = documentTypes;
        this.genders = genders;
      },
      error: () => {
        this.cities = [];
        this.documentTypes = [];
        this.genders = [];

        this.modalService.close('spinner');
      },
      complete: () => this.modalService.close('spinner'),
    });
  }

  public onSearchRooms(options: SearchRoomsEvent): void {
    const { checkin, checkout, passengers } = options;
    const $checkin = moment(checkin);
    const $checkout = moment(checkout);

    this.checkin = checkin;
    this.checkout = checkout;
    this.passengers = passengers;
    this.nights = $checkout.diff($checkin, 'days');

    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.roomService.filter(options).subscribe({
      next: (rooms) => {
        this.rooms = rooms;
      },
      error: () => {
        this.rooms = [];

        this.modalService.close('spinner');
      },
      complete: () => this.modalService.close('spinner'),
    });
  }

  public onBooking(event: BookingEvent): void {
    event.documentTypes = this.documentTypes;
    event.genders = this.genders;

    this.modalService.open(BookingsComponent, {
      id: 'new-booking',
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      disableClose: true,
      data: event,
    });
  }

  public onNewBooking(booking: Booking): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.bookingService.store(booking).subscribe({
      next: () => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: 'Reserva realizada con exito.',
          },
        });
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: 'Hubo un error al realizar la reserva.',
          },
        });

        this.modalService.close('spinner');
      },
      complete: () => {
        this.modalService.close('spinner');
        this.modalService.close('new-booking');
      },
    });
  }
}
