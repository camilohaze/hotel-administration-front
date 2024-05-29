import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrl: './new-city.component.scss',
  standalone: true,
  imports: [ComponentsModule, MatCardModule, MatDividerModule],
  providers: [CityService],
})
export class NewCityComponent implements OnInit {
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
  private cityService: CityService = inject(CityService);

  private $subscription: Subscription[] = [];

  constructor(private router: Router) {
    this.$subscriptions.push(
      this.eventBusService.on('new-city', (city: City) => {
        this.ngZone.run(() => this.onSumbit(city));
      })
    );
  }

  public ngOnInit(): void {
    // code here!
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
            message: `Ciudad creada con exito.`,
          },
        });
        this.modalService.close('spinner');
        this.router.navigate(['/admin/cities']);
      },
      error: () => {
        this.notificationService.open(NotifyErrorComponent, {
          duration: 3000,
          data: {
            message: `Hubo un error al crear la ciudad.`,
          },
        });
        this.modalService.close('spinner');
      },
    });
  }
}
