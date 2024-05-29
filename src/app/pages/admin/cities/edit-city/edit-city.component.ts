import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';

import { City } from '@interfaces';
import {
  EventBusService,
  ModalService,
  NotificationService,
  CityService,
} from '@services';
import {
  ComponentsModule,
  SpinnerComponent,
  NotifySuccessComponent,
  NotifyErrorComponent,
} from '@components';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [CityService],
})
export class EditCityComponent implements OnInit {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  public city!: City;

  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private eventBusService: EventBusService = inject(EventBusService);
  private cityService: CityService = inject(CityService);

  private $subscription: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.$subscriptions.push(
      this.eventBusService.on('edit-city', (city: City) => {
        this.onSumbit(city);
      })
    );
  }

  public ngOnInit(): void {
    const { cityId } = this.activatedRoute.snapshot.queryParams;

    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.cityService.getById(cityId).subscribe({
      next: (city) => {
        this.city = city;
      },
      error: () => this.modalService.close('spinner'),
      complete: () => this.modalService.close('spinner'),
    });
  }

  public onSumbit(city: City): void {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.cityService.update(city).subscribe({
      next: () => {
        this.notificationService.open(NotifySuccessComponent, {
          duration: 3000,
          data: {
            message: `Ciudad actualizada con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/cities']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al actualizar la ciudad.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
