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

  public store(rooms: Room[]): Observable<Room[]> {
    return this.http.post<Room[]>('rooms', rooms);
  }

  public update(rooms: Room[]): Observable<Room[]> {
    return this.http.put<Room[]>('rooms', rooms);
  }

  public remove(rooms: Room[]): Observable<Room[]> {
    return this.http.delete<Room[]>('rooms', { body: rooms });
  }
}
