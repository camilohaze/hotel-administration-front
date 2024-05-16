import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import { AuthService, EventBusService, SessionService } from '@services';
import { EventData } from 'src/app/class';


export class CustomHttpInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;

  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private eventBusService = inject(EventBusService);

  public constructor() {
    // code here !
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: 'http://localhost:3000/'.concat(request.url),
      withCredentials: true,
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
        if (!request.url.includes('auth/refresh') && error.status === 401) {
          return this.refreshToken(request, next, error);
        }

        return throwError(() => error);
      }),
      finalize(() => {
        // code here !
      })
    );
  }

  private refreshToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    originalError: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.sessionService.isLogging) {
        return this.authService.refresh().pipe(
          switchMap(() => {
            return next.handle(request);
          }),
          catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
            this.eventBusService.emit(new EventData('sessionDestroy', null));

            return throwError(() => originalError);
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        );
      }
    }

    return next.handle(request);
  }
}
