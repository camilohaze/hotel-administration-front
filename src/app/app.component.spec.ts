import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Idle, IdleExpiry } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { AppComponent } from './app.component';
import { EventBusService, SessionService } from './services';

export class MockExpiry extends IdleExpiry {
  public lastDate!: Date;
  public mockNow!: Date;

  last(value?: Date): Date {
    if (value !== void 0) {
      this.lastDate = value;
    }

    return this.lastDate;
  }

  override now(): Date {
    return this.mockNow || new Date();
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, AppComponent],
      providers: [
        EventBusService,
        SessionService,
        Idle,
        Keepalive,
        { provide: IdleExpiry, useClass: MockExpiry },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { hotelId: '1' } },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
