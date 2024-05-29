import { Component, OnDestroy, OnInit, ViewChild, inject, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData, CurrencyPipe, PercentPipe } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { RoomType } from '@interfaces';
import { RoomTypeService, ModalService } from '@services';
import { SpinnerComponent } from '@components';

registerLocaleData(localeCO);

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrl: './room-types.component.scss',
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
    RoomTypeService,
    { provide: LOCALE_ID, useValue: 'es-CO' },
    CurrencyPipe,
    PercentPipe,
  ],
})
export class RoomTypesComponent implements OnInit, OnDestroy {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public displayedColumns: string[] = ['type', 'description', 'price', 'tax', 'actions'];
  public dataSource: MatTableDataSource<RoomType> = new MatTableDataSource<RoomType>(
    []
  );

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  private modalService: ModalService = inject(ModalService);
  private roomTypeService: RoomTypeService = inject(RoomTypeService);

  private $subscription: Subscription[] = [];

  ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.roomTypeService.getAll().subscribe({
      next: (roomTypes) => {
        this.dataSource = new MatTableDataSource<RoomType>(roomTypes);
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

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
  }
}
