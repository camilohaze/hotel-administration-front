import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [GenderService],
})
export class EditGenderComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public gender!: Gender;

  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private genderService: GenderService = inject(GenderService);

  private $subscription: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.$subscriptions.push(
      this.eventBusService.on('edit-gender', (gender: Gender) => {
        this.onSumbit(gender);
      })
    );
  }

  public ngOnInit(): void {
    const { genderId } = this.activatedRoute.snapshot.queryParams;

    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.genderService.getById(genderId).subscribe({
      next: (gender) => {
        this.gender = gender;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
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
            message: `Género actualizado con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/genders']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al actualizar el género.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
