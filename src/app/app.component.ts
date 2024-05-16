import { Component, NgZone, inject } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import {
  AuthService,
  EventBusService,
  ModalService,
  SessionService,
} from '@services';
import { SessionTimeoutComponent } from '@components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [AuthService],
})
export class AppComponent {
  set $subscriptions($subscription: Subscription[]) {
    this.$subscription = $subscription;
  }

  get $subscriptions(): Subscription[] {
    return this.$subscription;
  }

  set dialogTimeoutVisible(dialogVisible: boolean) {
    this.dialogVisible = dialogVisible;
  }

  get dialogTimeoutVisible(): boolean {
    return this.dialogVisible;
  }

  get isLogging(): boolean {
    return this.sessionService.isLogging;
  }

  private ngZone: NgZone = inject(NgZone);
  private eventBusService: EventBusService = inject(EventBusService);
  private sessionService: SessionService = inject(SessionService);
  private modalService: ModalService = inject(ModalService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  private dialogVisible: boolean = false;
  private $subscription: Subscription[] = [];

  constructor() {
    this.$subscriptions.push(
      this.eventBusService.on('logout', () => {
        this.ngZone.run(() => this.logout());
      })
    );

    this.$subscriptions.push(
      this.eventBusService.on('sessionTimeout', (time: number) => {
        if (time === 1000) {
          const modal = this.modalService.openDialogs.find(
            (p) => p.id === 'timeout'
          );

          if (!!modal) {
            modal.close('timeout');
          }
        }

        this.sessionTimeout(time);
      })
    );

    this.$subscriptions.push(
      this.eventBusService.on('sessionStart', () => {
        this.sessionStart();
      })
    );

    this.$subscriptions.push(
      this.eventBusService.on('sessionDestroy', () => {
        this.sessionDestroy();
      })
    );
  }

  public logout(): void {
    this.$subscriptions.push(
      this.authService.logout().subscribe({
        next: () => {
          this.sessionDestroy();
        },
      })
    );
  }

  public sessionTimeout(time: number): void {
    this.sessionService.$timeout.next(time);

    if (!this.dialogTimeoutVisible) {
      this.dialogTimeoutVisible = true;

      this.modalService.open(
        SessionTimeoutComponent,
        {
          id: 'timeout',
          disableClose: true,
          width: '40%',
        },
        (reason: string) => {
          this.dialogTimeoutVisible = false;

          switch (reason) {
            case 'logout':
            case 'timeout':
              this.logout();
              break;

            default:
              this.sessionService.idling();
              break;
          }
        }
      );
    }
  }

  public sessionStart(): void {
    this.sessionService.start();
  }

  public sessionDestroy(): void {
    this.sessionService.stop();
    this.sessionService.clear();
    this.modalService.closeAll();
    this.router.navigate(['/admin/login']);
  }

  public navigate(path: string, drawer: MatDrawer): void {
    this.router.navigate([path])
    drawer.toggle();
  }
}
