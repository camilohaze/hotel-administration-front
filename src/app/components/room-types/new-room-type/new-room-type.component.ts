import { Component, LOCALE_ID, inject } from '@angular/core';
import { CommonModule, registerLocaleData, Location } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { EventData } from '@class';
import { EventBusService } from '@services';

registerLocaleData(localeCO);

@Component({
  selector: 'cmp-new-room-type',
  templateUrl: './new-room-type.component.html',
  styleUrl: './new-room-type.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
})
export class NewRoomTypeComponent {
  public form: FormGroup = this.formBuilder.group({
    type: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    minimum: new FormControl(null, [Validators.required]),
    maximum: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    tax: new FormControl(null, [Validators.required]),
  });

  private eventBusService: EventBusService = inject(EventBusService);

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  public onlyNumbers(event: any): boolean {
    if (!/^[0-9]$/i.test(event.key)) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  public onGoBack(): void {
    this.location.back();
  }

  public onSumbit(): void {
    if (this.form.valid) {
      this.eventBusService.emit(new EventData('new-room-type', this.form.value));
    }
  }
}
