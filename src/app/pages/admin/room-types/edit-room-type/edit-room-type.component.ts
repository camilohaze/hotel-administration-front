import { Component, NgZone, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-room-type',
  templateUrl: './edit-room-type.component.html',
  styleUrl: './edit-room-type.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [RoomTypeService],
})
export class EditRoomTypeComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public roomType!: RoomType;

  private ngZone: NgZone = inject(NgZone);
  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private roomTypeService: RoomTypeService = inject(RoomTypeService);

  private $subscription: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.$subscriptions.push(
      this.eventBusService.on('edit-room-type', (roomType: RoomType) => {
        this.ngZone.run(() => this.onSumbit(roomType));
      })
    );
  }

  public ngOnInit(): void {
    const { roomTypeId } = this.activatedRoute.snapshot.queryParams;

    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.roomTypeService.getById(roomTypeId).subscribe({
      next: (roomType) => {
        this.roomType = roomType;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
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
            message: `Tipo de habitación actualizada con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/room-types']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al actualizar el tipo de habitación.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
