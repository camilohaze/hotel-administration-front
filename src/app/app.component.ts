import { Component, NgZone, ViewChild, inject } from '@angular/core';
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
  @ViewChild('drawer') drawer!: MatDrawer;

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
        this.ngZone.run(() => {
          if (time === 1000) {
            const modal = this.modalService.openDialogs.find(
              (p) => p.id === 'timeout'
            );

            if (!!modal) {
              modal.close('timeout');
            }
          }

          this.sessionTimeout(time);
        });
      })
    );

    this.$subscriptions.push(
      this.eventBusService.on('sessionStart', () => {
        this.ngZone.run(() => this.sessionStart());
      })
    );

    this.$subscriptions.push(
      this.eventBusService.on('sessionDestroy', () => {
        this.ngZone.run(() => this.sessionDestroy());
      })
    );
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
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
    this.drawer.close();
    this.router.navigate(['/admin/login']);
  }

  public navigate(path: string): void {
    this.router.navigate([path]);
    this.drawer.toggle();
  }
}
