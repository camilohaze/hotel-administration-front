import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { SessionService } from '@services';

@Component({
  selector: 'cmp-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [DatePipe]
})
export class SessionTimeoutComponent {
  @Input() time: number = 0;

  set $subscriptions($subscriptions: Subscription[]) {
    this._$subscriptions = $subscriptions;
  }

  get $subscriptions(): Subscription[] {
    return this._$subscriptions;
  }

  private _$subscriptions: Subscription[] = [];

  constructor(private sessionService: SessionService) {
    this.$subscriptions.push(
      this.sessionService.$timeout.subscribe({
        next: (time) => (this.time = time),
      })
    );
  }

  public ngOnDestroy(): void {
    this.$subscriptions.filter((p) => !p.closed).filter((p) => p.unsubscribe());
  }
}
