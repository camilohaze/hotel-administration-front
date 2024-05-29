import {
  Component,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
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
import { RoomType } from '@interfaces';

registerLocaleData(localeCO);

@Component({
  selector: 'cmp-edit-room-type',
  templateUrl: './edit-room-type.component.html',
  styleUrl: './edit-room-type.component.scss',
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
export class EditRoomTypeComponent implements OnChanges, OnInit {
  @Input() public roomType!: RoomType;

  public form: FormGroup = this.formBuilder.group({
    id: new FormControl(null, []),
    type: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    minimum: new FormControl(null, [Validators.required]),
    maximum: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    tax: new FormControl(null, [Validators.required]),
  });

  private eventBusService: EventBusService = inject(EventBusService);

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { roomType } = changes;

    if (roomType && roomType.currentValue) {
      this.form.patchValue(this.roomType);
    }
  }

  ngOnInit(): void {
    // code here!
  }

  public onlyNumbers(event: any): boolean {
    if (!/^[0-9]$/i.test(event.key)) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  public onlyDecimals(event: any, field: string): void {
    const {
      target: { value },
    } = event;

    this.form
      .get(field)!
      .patchValue(
        value.replace(/\D/g, '').replace(/([0-9])([0-9]{1})$/, '$1.$2')
      );
  }

  public onGoBack(): void {
    this.location.back();
  }

  public onSumbit(): void {
    if (this.form.valid) {
      this.eventBusService.emit(
        new EventData('edit-room-type', this.form.value)
      );
    }
  }
}
