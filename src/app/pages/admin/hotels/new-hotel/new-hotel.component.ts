import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  RoomTypeService,
} from '@services';
import {
  ComponentsModule,
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrl: './new-hotel.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [HotelService, RoomTypeService, CityService],
})
export class NewHotelComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public roomTypes: RoomType[] = [];
  public cities: City[] = [];

  private ngZone: NgZone = inject(NgZone);
  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private hotelService: HotelService = inject(HotelService);
  private roomTypeService: RoomTypeService = inject(RoomTypeService);
  private cityService: CityService = inject(CityService);

  private $subscription: Subscription[] = [];

  constructor(private router: Router) {
    this.$subscriptions.push(
      this.eventBusService.on('new-hotel', (hotel: Hotel) => {
        this.ngZone.run(() => this.onSumbit(hotel));
      })
    );
  }

  public ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    const requests = forkJoin({
      roomTypes: this.roomTypeService.getAll(),
      cities: this.cityService.getAll(),
    });

    requests.subscribe({
      next: ({ roomTypes, cities }) => {
        this.roomTypes = roomTypes;
        this.cities = cities;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
  }

  public onSumbit(hotel: Hotel): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.hotelService.update(hotel).subscribe({
      next: () => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: `Hotel creado con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/hotels']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al crear el hotel.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
