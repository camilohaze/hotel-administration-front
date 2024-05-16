import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandlerHelper extends ErrorHandler {
  public constructor() {
    // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    super();
  }

  public override handleError(error: any): void {
    // send the error to the server
    // delegate to the default handler
    super.handleError(error);
  }
}

export let ErrorHandlerProvider = {
  provide: ErrorHandler,
  useClass: CustomErrorHandlerHelper,
};
