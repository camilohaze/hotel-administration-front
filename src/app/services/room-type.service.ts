import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RoomType } from '@interfaces';

@Injectable()
export class RoomTypeService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>('room-types');
  }

  public getById(id: number): Observable<RoomType> {
    return this.http.get<RoomType>(`room-types/${id}`);
  }

  public store(hotel: RoomType): Observable<RoomType> {
    return this.http.post<RoomType>('room-types', hotel);
  }

  public update(hotel: RoomType): Observable<RoomType> {
    return this.http.put<RoomType>('room-types', hotel);
  }

  public remove(hotel: RoomType): Observable<RoomType> {
    return this.http.delete<RoomType>('room-types', { body: hotel });
  }
}
