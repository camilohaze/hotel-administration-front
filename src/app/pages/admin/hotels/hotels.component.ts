import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { Hotel } from '@interfaces';
import { HotelService, ModalService, NotificationService } from '@services';
import {
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [HotelService],
})
export class HotelsComponent implements OnInit, OnDestroy {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public displayedColumns: string[] = [
    'name',
    'address',
    'phone',
    'email',
    'status',
    'actions',
  ];
  public dataSource: MatTableDataSource<Hotel> = new MatTableDataSource<Hotel>(
    []
  );

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private hotelService: HotelService = inject(HotelService);

  private $subscription: Subscription[] = [];

  ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.hotelService.getAll().subscribe({
      next: (hotels) => {
        this.dataSource = new MatTableDataSource<Hotel>(hotels);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        // code here !
      },
      complete: () => {
        this.modalService.close('spinner');
      },
    });
  }

  onToggleStatus(hotel: Hotel): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    hotel.status = !hotel.status;

    this.hotelService.toggleStatus(hotel).subscribe({
      next: (hotelUpdated) => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: `Hotel ${
              hotel.status ? 'habilitado' : 'deshabilitado'
            } con exito.`,
          },
        });

        hotel = hotelUpdated;
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al ${
              hotel.status ? 'habilitar' : 'deshabilitar'
            } el hotel.`,
          },
        });

        hotel.status = !hotel.status;
      },
      complete: () => {
        this.modalService.close('spinner');
      },
    });
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
  }
}
