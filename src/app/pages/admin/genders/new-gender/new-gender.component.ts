import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';

import { Gender } from '@interfaces';
import {
  EventBusService,
  ModalService,
  NotificationService,
  GenderService,
} from '@services';
import {
  ComponentsModule,
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [GenderService],
})
export class NewGenderComponent implements OnInit {
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
  private genderService: GenderService = inject(GenderService);

  private $subscription: Subscription[] = [];

  constructor(private router: Router) {
    this.$subscriptions.push(
      this.eventBusService.on('new-gender', (gender: Gender) => {
        this.ngZone.run(() => this.onSumbit(gender));
      })
    );
  }

  public ngOnInit(): void {
    // code here!
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
  }

  public onSumbit(gender: Gender): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.genderService.update(gender).subscribe({
      next: () => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: `Género creado con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/genders']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al crear el género.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
