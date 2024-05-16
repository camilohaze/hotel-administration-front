import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Booking } from '@interfaces';

@Injectable()
export class BookingService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>('bookings');
  }

  public getById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`bookings/${id}`);
  }

  public getByHotelId(hotelId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`bookings/hotel/${hotelId}`);
  }

  public getByRoomId(roomId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`bookings/room/${roomId}`);
  }

  public store(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>('bookings', booking);
  }

  public update(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>('bookings', booking);
  }

  public remove(booking: Booking): Observable<Booking> {
    return this.http.delete<Booking>('bookings', { body: booking });
  }
}
