import { Injectable, ApplicationRef } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BehaviorSubject } from 'rxjs';

import { EventData } from '@class';
import { LoginResponse } from '@interfaces';
import { EventBusService } from './event-bus.service';

@Injectable()
export class SessionService {
  $timeout: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get sessionTime(): number {
    return this._sessionTime;
  }

  get timeout(): number {
    return this._timeout;
  }

  get pingTime(): number {
    return this._pingTime;
  }

  set lastPing(lastPing: Date) {
    this._lastPing = lastPing;
  }

  get lastPing(): Date {
    return this._lastPing;
  }

  set modules(modules: string[]) {
    this._modules = modules;
  }

  get modules(): string[] {
    return this._modules;
  }

  private _modules: string[] = [];

  private _sessionTime: number = 60 * 2;
  private _timeout: number = 60 * 1;
  private _pingTime: number = 60 * 1;
  private _lastPing!: Date;

  public constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private applicationRef: ApplicationRef,
    private eventBusService: EventBusService
  ) {}

  get isLogging(): boolean {
    const isLogging = sessionStorage.getItem('isLogging');
    const notLogging = false;

    if (!!isLogging) {
      try {
        return JSON.parse(isLogging);
      } catch (e) {
        return notLogging;
      }
    }

    return notLogging;
  }

  get isIdling(): boolean {
    return this.idle.isIdling();
  }

  set(login: LoginResponse): void {
    sessionStorage.setItem('isLogging', login.isLogging);
    sessionStorage.setItem('role', login.role);
  }

  start(): void {
    if (this.isLogging) {
      this.idling();
    }
  }

  idling(): void {
    this.idle.setIdle(this.sessionTime);
    this.idle.setTimeout(this.timeout);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.keepalive.interval(this.pingTime);

    this.idle.onIdleEnd.subscribe(() => {
      this.applicationRef.tick();
    });

    this.idle.onTimeout.subscribe(() => {
      this.eventBusService.emit(new EventData('logout', null));
    });

    this.idle.onTimeoutWarning.subscribe((seconds) => {
      const milliseconds = seconds * 1000;

      this.idle.setInterrupts([]);

      this.eventBusService.emit(new EventData('sessionTimeout', milliseconds));
    });

    this.keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.idle.watch();
  }

  stop(): void {
    this.idle.stop();
  }

  clear(): void {
    sessionStorage.clear();
  }
}
