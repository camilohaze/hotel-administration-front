import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class QueryParamsGuard {
  constructor(private location: Location) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { queryParams, parent } = route;
    const url = parent && parent.routeConfig && parent.routeConfig.path;

    switch (url) {
      case 'hotels':
        if (!queryParams.hasOwnProperty('hotelId')) {
          this.location.back();

          return false;
        }

        return true;

      case 'bookings':
        if (!queryParams.hasOwnProperty('bookingId')) {
          this.location.back();

          return false;
        }

        return true;

      default:
        return true;
    }

  }
}
