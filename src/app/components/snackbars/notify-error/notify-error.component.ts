import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cmp-notify-error',
  templateUrl: './notify-error.component.html',
  styleUrls: ['./notify-error.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule],
})
export class NotifyErrorComponent {
  matSnackBarRef = inject(MatSnackBarRef);
  message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = this.data.message;
  }
}
