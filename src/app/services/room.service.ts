import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room, SearchRoomsEvent } from '@interfaces';

@Injectable()
export class RoomService {
  constructor(private http: HttpClient) {}

  public getById(id: number): Observable<Room> {
    return this.http.get<Room>(`rooms/${id}`);
  }

  public getByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`rooms/hotel/${hotelId}`);
  }

  public filter(options: SearchRoomsEvent): Observable<Room[]> {
    return this.http.post<Room[]>('rooms/filter', options);
  }

  public store(hotel: Room[]): Observable<Room[]> {
    return this.http.post<Room[]>('rooms', hotel);
  }

  public update(hotel: Room[]): Observable<Room[]> {
    return this.http.put<Room[]>('rooms', hotel);
  }

  public remove(hotel: Room): Observable<Room> {
    return this.http.delete<Room>('rooms', { body: hotel });
  }
}
