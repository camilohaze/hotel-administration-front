import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

import { LoginRequest, LoginResponse } from '@interfaces';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient){}

  public async login(data: LoginRequest): Promise<LoginResponse> {
    return await lastValueFrom(
      this.http.post<LoginResponse>('auth/login', data)
    );
  }

  public logout(): Observable<void> {
    return this.http.post<void>('auth/logout', {});
  }

  public refresh(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/refresh', {});
  }
}
