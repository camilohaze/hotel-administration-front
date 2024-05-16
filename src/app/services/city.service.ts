import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { City } from '@interfaces';

@Injectable()
export class CityService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<City[]> {
    return this.http.get<City[]>('cities');
  }

  public getById(id: number): Observable<City> {
    return this.http.get<City>(`cities/${id}`);
  }

  public store(hotel: City): Observable<City> {
    return this.http.post<City>('cities', hotel);
  }

  public update(hotel: City): Observable<City> {
    return this.http.put<City>('cities', hotel);
  }

  public remove(hotel: City): Observable<City> {
    return this.http.delete<City>('cities', { body: hotel });
  }
}
