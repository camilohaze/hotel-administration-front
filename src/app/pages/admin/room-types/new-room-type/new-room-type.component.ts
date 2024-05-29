import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';

import { RoomType } from '@interfaces';
import {
  EventBusService,
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
  selector: 'app-new-room-type',
  templateUrl: './new-room-type.component.html',
  styleUrl: './new-room-type.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [RoomTypeService],
})
export class NewRoomTypeComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  private ngZone: NgZone = inject(NgZone);
  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private roomTypeService: RoomTypeService = inject(RoomTypeService);

  private $subscription: Subscription[] = [];

  constructor(private router: Router) {
    this.$subscriptions.push(
      this.eventBusService.on('new-room-type', (roomType: RoomType) => {
        this.ngZone.run(() => this.onSumbit(roomType));
      })
    );
  }

  public ngOnInit(): void {
    // code here!
  }

  public onSumbit(roomType: RoomType): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.roomTypeService.update(roomType).subscribe({
      next: () => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: `Tipo de habitación creado con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/room-types']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al crear el tipo de habitación.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
