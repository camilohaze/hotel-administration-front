import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable()
export class TitleResolver implements Resolve<any> {
  public constructor(private router: Router, private titleService: Title) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.titleService.setTitle(`Dyer - ${route.data['title']}`);

    return true;
  }
}
