import { Component, NgZone, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription, forkJoin } from 'rxjs';

import { City, Hotel, RoomType } from '@interfaces';
import {
  CityService,
  EventBusService,
  HotelService,
  ModalService,
  NotificationService,
  RoomService,
  RoomTypeService,
} from '@services';
import {
  ComponentsModule,
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrl: './edit-hotel.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [HotelService, RoomService, RoomTypeService, CityService],
})
export class EditHotelComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public roomTypes: RoomType[] = [];
  public cities: City[] = [];
  public hotel!: Hotel;

  private ngZone: NgZone = inject(NgZone);
  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private hotelService: HotelService = inject(HotelService);
  private roomService: RoomService = inject(RoomService);
  private roomTypeService: RoomTypeService = inject(RoomTypeService);
  private cityService: CityService = inject(CityService);

  private $subscription: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.$subscriptions.push(
      this.eventBusService.on('edit-hotel', (hotel: Hotel) => {
        this.ngZone.run(() => this.onSumbit(hotel));
      })
    );
  }

  public ngOnInit(): void {
    const { hotelId } = this.activatedRoute.snapshot.queryParams;

    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    const response = forkJoin({
      roomTypes: this.roomTypeService.getAll(),
      cities: this.cityService.getAll(),
      hotel: this.hotelService.getById(hotelId),
    });

    response.subscribe({
      next: ({ roomTypes, cities, hotel }) => {
        this.roomTypes = roomTypes;
        this.cities = cities;
        this.hotel = hotel;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
  }

  public onSumbit(hotel: Hotel): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    const { id } = hotel;

    let rooms = this.hotel.rooms.filter(
      (room) =>
        hotel.rooms
          .filter((p) => !!p.id)
          .map((p) => p.id)
          .indexOf(room.id) < 0
    );

    if (!!rooms.length) {
      this.roomService.remove(rooms).subscribe();
    }

    hotel.rooms = [...hotel.rooms].map((room) => {
      room.hotelId = id;

      return room;
    });

    this.hotelService.update(hotel).subscribe({
      next: () => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: `Hotel actualizado con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/hotels']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al actualizar el hotel.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
