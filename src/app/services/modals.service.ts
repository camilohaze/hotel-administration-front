import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  get openDialogs(): MatDialogRef<any>[] {
    return this.matDialog.openDialogs;
  }

  constructor(private matDialog: MatDialog) {}

  open<T, D = any>(
    component: ComponentType<T> | TemplateRef<T>,
    config: MatDialogConfig<D>,
    callback?: Function
  ): void {
    const { id } = config;
    let dialogRef;

    if (!!id) {
      const modal = this.matDialog.getDialogById(id);

      if (!!modal) {
        modal.close();
      } else {
        dialogRef = this.matDialog.open(component, config);

        if (typeof callback === 'function') {
          dialogRef.afterClosed().subscribe((reason) => {
            callback(reason);
          });
        }
      }
    }
  }

  close(id: string): void {
    const modal = this.matDialog.openDialogs.find((p) => p.id === id);

    if (!!modal) {
      modal.close();
    }
  }

  closeAll(): void {
    this.matDialog.openDialogs.every((p) => p.close());
  }
}
