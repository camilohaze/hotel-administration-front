import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hotel } from '@interfaces';

@Injectable()
export class HotelService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('hotels');
  }

  public getById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`hotels/${id}`);
  }

  public store(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>('hotels', hotel);
  }

  public update(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>('hotels', hotel);
  }

  public remove(hotel: Hotel): Observable<Hotel> {
    return this.http.delete<Hotel>('hotels', { body: hotel });
  }
}
