import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Guest } from '@interfaces';

@Injectable()
export class GuestService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Guest[]> {
    return this.http.get<Guest[]>('guests');
  }

  public getById(id: number): Observable<Guest> {
    return this.http.get<Guest>(`guests/${id}`);
  }

  public store(hotel: Guest): Observable<Guest> {
    return this.http.post<Guest>('guests', hotel);
  }

  public update(hotel: Guest): Observable<Guest> {
    return this.http.put<Guest>('guests', hotel);
  }

  public remove(hotel: Guest): Observable<Guest> {
    return this.http.delete<Guest>('guests', { body: hotel });
  }
}
