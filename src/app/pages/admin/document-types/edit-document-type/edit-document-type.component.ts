import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';

import { DocumentType } from '@interfaces';
import {
  EventBusService,
  ModalService,
  NotificationService,
  DocumentTypeService,
} from '@services';
import {
  ComponentsModule,
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';

@Component({
  selector: 'app-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrl: './edit-document-type.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [DocumentTypeService],
})
export class EditDocumentTypeComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public documentType!: DocumentType;

  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private documentTypeService: DocumentTypeService = inject(DocumentTypeService);

  private $subscription: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.$subscriptions.push(
      this.eventBusService.on('edit-document-type', (documentType: DocumentType) => {
        this.onSumbit(documentType);
      })
    );
  }

  public ngOnInit(): void {
    const { documentTypeId } = this.activatedRoute.snapshot.queryParams;

    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.documentTypeService.getById(documentTypeId).subscribe({
      next: (documentType) => {
        this.documentType = documentType;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
  }

  public onSumbit(documentType: DocumentType): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.documentTypeService.update(documentType).subscribe({
      next: () => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: `Tipo de documento actualizado con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/document-types']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al actualizar el tipo de documento.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
