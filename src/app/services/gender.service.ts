import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gender } from '@interfaces';

@Injectable()
export class GenderService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Gender[]> {
    return this.http.get<Gender[]>('genders');
  }

  public getById(id: number): Observable<Gender> {
    return this.http.get<Gender>(`genders/${id}`);
  }

  public store(hotel: Gender): Observable<Gender> {
    return this.http.post<Gender>('genders', hotel);
  }

  public update(hotel: Gender): Observable<Gender> {
    return this.http.put<Gender>('genders', hotel);
  }

  public remove(hotel: Gender): Observable<Gender> {
    return this.http.delete<Gender>('genders', { body: hotel });
  }
}
