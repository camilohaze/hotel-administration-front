import { Component, Input, LOCALE_ID, inject } from '@angular/core';
import {
  CommonModule,
  registerLocaleData,
  CurrencyPipe,
  PercentPipe,
  Location,
} from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

import { ConfirmComponent } from '@components';
import { EventData } from '@class';
import { ModalService, EventBusService } from '@services';
import { City, RoomType } from '@interfaces';

registerLocaleData(localeCO);

@Component({
  selector: 'cmp-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrl: './new-hotel.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    CurrencyPipe,
    PercentPipe,
  ],
})
export class NewHotelComponent {
  get rooms() {
    return this.form.controls['rooms'] as FormArray;
  }

  @Input() public roomTypes: RoomType[] = [];
  @Input() public cities: City[] = [];

  public form: FormGroup = this.formBuilder.group({
    name: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cityId: new FormControl(null, [Validators.required]),
    rooms: this.formBuilder.array([
      this.formBuilder.group({
        id: new FormControl(0, []),
        number: new FormControl('', [Validators.required]),
        roomTypeId: new FormControl('', [Validators.required]),
        hotelId: new FormControl(0, []),
        busy: new FormControl(false, []),
        status: new FormControl(true, []),
      })
    ]),
  });

  private modalService: ModalService = inject(ModalService);
  private eventBusService: EventBusService = inject(EventBusService);

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  public addRoom(): void {
    const room = this.formBuilder.group({
      id: new FormControl(0, []),
      number: new FormControl('', [Validators.required]),
      roomTypeId: new FormControl('', [Validators.required]),
      hotelId: new FormControl(0, []),
      busy: new FormControl(false, []),
      status: new FormControl(true, []),
    });

    this.rooms.push(room);
  }

  public deleteRoom(index: number): void {
    this.modalService.open(
      ConfirmComponent,
      {
        id: 'delete-room',
        data: index,
      },
      (confirm: boolean) => {
        if (confirm) {
          this.rooms.removeAt(index);
        }
      },
    );
  }

  public getDetail(index: number): RoomType | undefined {
    const roomTypeId = this.rooms.controls[index].get('roomTypeId')?.value;

    if (!!roomTypeId) {
      const rommType = this.roomTypes.find((p) => p.id === roomTypeId);

      return rommType;
    }

    return;
  }

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
      this.eventBusService.emit(new EventData('new-hotel', this.form.value));
    }
  }
}
