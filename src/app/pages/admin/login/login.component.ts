import { Component, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  AuthService,
  EventBusService,
  ModalService,
  NotificationService,
  SessionService,
} from '@services';
import { LoginRequest } from '@interfaces';
import { SpinnerComponent, NotifyErrorComponent } from '@components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  private ngZone: NgZone = inject(NgZone);
  private eventBusService: EventBusService = inject(EventBusService);
  private sessionService: SessionService = inject(SessionService);
  private modalService: ModalService = inject(ModalService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  private $subscription: Subscription[] = [];

  constructor() {
    this.$subscriptions.push(
      this.eventBusService.on('login', (data: LoginRequest) =>
        this.ngZone.run(() => this.onSubmit(data))
      )
    );
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
  }

  public async onSubmit(data: LoginRequest): Promise<void> {
    this.modalService.open(SpinnerComponent, {
      id: 'spinner',
      disableClose: true,
    });

    this.authService
      .login(data)
      .then((login) => {
        this.sessionService.set(login);

        this.sessionService.start();
        this.router.navigate(['/admin/hotels']);
      })
      .catch((error) => {
        const { status } = error;

        if (status === 404) {
          this.notificationService.open(NotifyErrorComponent, {
            duration: 3000,
            data: {
              message: `El usuario no existe.`,
            },
          });
        }
      });

    this.modalService.close('spinner');
  }
}
