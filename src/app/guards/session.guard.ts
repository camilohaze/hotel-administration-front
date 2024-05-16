import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { SessionService } from '@services';

@Injectable()
export class SessionGuard {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const page = route?.routeConfig?.path;
    const isLogging = this.sessionService.isLogging;

    if (page === 'login') {
      if (isLogging) {
        this.router.navigate(['/admin/hotels']);
      }

      return true;
    }

    if (!isLogging) {
      this.router.navigate(['/admin/login']);

      return false;
    }

    return true;
  }
}
