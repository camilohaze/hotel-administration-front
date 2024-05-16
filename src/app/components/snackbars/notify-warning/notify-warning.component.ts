import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cmp-notify-warning',
  templateUrl: './notify-warning.component.html',
  styleUrls: ['./notify-warning.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule, MatIconModule, MatButtonModule],
})
export class NotifyWarningComponent {
  matSnackBarRef = inject(MatSnackBarRef);
  message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = this.data.message;
  }
}
