import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cmp-notify-info',
  templateUrl: './notify-info.component.html',
  styleUrls: ['./notify-info.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule, MatIconModule, MatButtonModule],
})
export class NotifyInfoComponent {
  matSnackBarRef = inject(MatSnackBarRef);
  message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = this.data.message;
  }
}
