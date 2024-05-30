import {
  Component,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
import { City, Hotel, RoomType } from '@interfaces';

registerLocaleData(localeCO);

@Component({
  selector: 'cmp-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrl: './edit-hotel.component.scss',
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
    MatSlideToggleModule,
    MatDividerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    CurrencyPipe,
    PercentPipe,
  ],
})
export class EditHotelComponent implements OnChanges, OnInit {
  get rooms() {
    return this.form.controls['rooms'] as FormArray;
  }

  @Input() public roomTypes: RoomType[] = [];
  @Input() public cities: City[] = [];
  @Input() public hotel!: Hotel;

  public form: FormGroup = this.formBuilder.group({
    id: new FormControl(null, []),
    name: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cityId: new FormControl(null, [Validators.required]),
    status: new FormControl(null, []),
    rooms: this.formBuilder.array([]),
  });

  private modalService: ModalService = inject(ModalService);
  private eventBusService: EventBusService = inject(EventBusService);

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { hotel } = changes;

    if (hotel && hotel.currentValue) {
      this.form.patchValue(this.hotel);

      this.hotel.rooms.forEach((item) => {
        const { id, number, roomTypeId, hotelId, busy, status } = item;

        this.rooms.push(
          this.formBuilder.group({
            id: new FormControl(id, []),
            number: new FormControl(number, [Validators.required]),
            roomTypeId: new FormControl(roomTypeId, [Validators.required]),
            hotelId: new FormControl(hotelId, []),
            busy: new FormControl(busy, []),
            status: new FormControl(status, []),
          })
        );
      });
    }
  }

  ngOnInit(): void {
    // code here!
  }

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
      this.eventBusService.emit(new EventData('edit-hotel', this.form.value));
    }
  }
}
