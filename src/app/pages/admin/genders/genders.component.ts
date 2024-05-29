import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { Gender } from '@interfaces';
import { GenderService, ModalService } from '@services';
import { SpinnerComponent } from '@components';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrl: './genders.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [GenderService],
})
export class GendersComponent implements OnInit, OnDestroy {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource: MatTableDataSource<Gender> = new MatTableDataSource<Gender>(
    []
  );

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  private modalService: ModalService = inject(ModalService);
  private genderService: GenderService = inject(GenderService);

  private $subscription: Subscription[] = [];

  ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.genderService.getAll().subscribe({
      next: (genders) => {
        this.dataSource = new MatTableDataSource<Gender>(genders);
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
