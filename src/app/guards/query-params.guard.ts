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
      case 'cities':
        if (!queryParams.hasOwnProperty('cityId')) {
          this.location.back();

          return false;
        }

        return true;

      case 'document-types':
        if (!queryParams.hasOwnProperty('documentTypeId')) {
          this.location.back();

          return false;
        }

        return true;

      case 'genders':
        if (!queryParams.hasOwnProperty('genderId')) {
          this.location.back();

          return false;
        }

        return true;

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

      case 'room-types':
        if (!queryParams.hasOwnProperty('roomTypeId')) {
          this.location.back();

          return false;
        }

        return true;

      default:
        return true;
    }
  }
}
