import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { CustomHttpInterceptor } from '@interceptors';
import { AuthService, SessionService, EventBusService } from '@services';
import { routes } from './app.routes';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    AuthService,
    SessionService,
    EventBusService,
    DatePipe,
    importProvidersFrom(NgIdleKeepaliveModule.forRoot()),
  ],
};
