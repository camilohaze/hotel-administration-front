import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarDismiss,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private matSnackBar: MatSnackBar) {}

  open<T, D = any>(
    component: ComponentType<T> | TemplateRef<T>,
    config?: MatSnackBarConfig<D>,
    callback?: Function
  ): void {
    let snackBarRef: MatSnackBarRef<any>;

    if (component instanceof TemplateRef) {
      snackBarRef = this.matSnackBar.openFromTemplate(component, config);
    } else {
      snackBarRef = this.matSnackBar.openFromComponent(component, config);
    }

    if (typeof callback === 'function') {
      snackBarRef.afterDismissed().subscribe((info: MatSnackBarDismiss) => {
        callback(info);
      });
    }
  }
}
