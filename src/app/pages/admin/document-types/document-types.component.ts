import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { DocumentType } from '@interfaces';
import { DocumentTypeService, ModalService } from '@services';
import { SpinnerComponent } from '@components';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrl: './document-types.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [DocumentTypeService],
})
export class DocumentTypesComponent implements OnInit, OnDestroy {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public displayedColumns: string[] = ['abbreviation', 'name', 'actions'];
  public dataSource: MatTableDataSource<DocumentType> = new MatTableDataSource<DocumentType>(
    []
  );

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  private modalService: ModalService = inject(ModalService);
  private documenTypeService: DocumentTypeService = inject(DocumentTypeService);

  private $subscription: Subscription[] = [];

  ngOnInit(): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.documenTypeService.getAll().subscribe({
      next: (documentTypes) => {
        this.dataSource = new MatTableDataSource<DocumentType>(documentTypes);
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
