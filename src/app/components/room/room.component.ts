import { Component, Input, LOCALE_ID, inject } from '@angular/core';
import {
  CommonModule,
  registerLocaleData,
  CurrencyPipe,
} from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Moment } from 'moment';

import { BookingEvent, Room } from '@interfaces';
import { EventData } from '@class';
import { EventBusService } from '@services';

registerLocaleData(localeCO);

@Component({
  selector: 'cmp-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }, CurrencyPipe],
})
export class RoomComponent {
  @Input() room!: Room;
  @Input() nights!: number;
  @Input() checkin!: Moment;
  @Input() checkout!: Moment;
  @Input() passengers!: number;

  private imgPreffix: number = Math.random() * 100;
  public image: string = `https://picsum.photos/350/250?v=${this.imgPreffix}_${Date.now()}`;

  get iva(): number {
    return this.room.roomType.tax / 100;
  }

  get night(): number {
    return this.room.roomType.price;
  }

  get subtotal(): number {
    return this.room.roomType.price * this.nights;
  }

  get total(): number {
    return this.subtotal + this.subtotal * this.iva;
  }

  private eventBusService: EventBusService = inject(EventBusService);

  public onBooking(): void {
    const { id, hotelId, hotel  } = this.room;
    const event: BookingEvent = {
      id: 0,
      hotelId,
      hotel,
      roomId: id,
      room: this.room,
      checkin: this.checkin.format('YYYY-MM-DD'),
      checkout: this.checkout.format('YYYY-MM-DD'),
      passengers: this.passengers,
      total: this.total,
      documentTypes: [],
      genders: [],
      guests: [],
    };

    this.eventBusService.emit(new EventData('booking', event));
  }
}
