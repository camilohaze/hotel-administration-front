import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-new-document-type',
  templateUrl: './new-document-type.component.html',
  styleUrl: './new-document-type.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [DocumentTypeService],
})
export class NewDocumentTypeComponent implements OnInit {
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
  private documentTypeService: DocumentTypeService = inject(DocumentTypeService);

  private $subscription: Subscription[] = [];

  constructor(private router: Router) {
    this.$subscriptions.push(
      this.eventBusService.on('new-document-type', (documentType: DocumentType) => {
        this.ngZone.run(() => this.onSumbit(documentType));
      })
    );
  }

  public ngOnInit(): void {
    // code here!
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
            message: `Tipo de documento creado con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/document-types']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al crear el tipo de documento.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
