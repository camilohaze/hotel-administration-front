import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { City } from '@interfaces';
import { CityService, ModalService } from '@services';
import { SpinnerComponent } from '@components';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [CityService],
})
export class CitiesComponent implements OnInit, OnDestroy {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource: MatTableDataSource<City> = new MatTableDataSource<City>(
    []
  );

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  private modalService: ModalService = inject(ModalService);
  private cityService: CityService = inject(CityService);

  private $subscription: Subscription[] = [];

  ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.cityService.getAll().subscribe({
      next: (cities) => {
        this.dataSource = new MatTableDataSource<City>(cities);
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
