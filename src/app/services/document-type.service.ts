import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DocumentType } from '@interfaces';

@Injectable()
export class DocumentTypeService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>('document-types');
  }

  public getById(id: number): Observable<DocumentType> {
    return this.http.get<DocumentType>(`document-types/${id}`);
  }

  public store(hotel: DocumentType): Observable<DocumentType> {
    return this.http.post<DocumentType>('document-types', hotel);
  }

  public update(hotel: DocumentType): Observable<DocumentType> {
    return this.http.put<DocumentType>('document-types', hotel);
  }

  public remove(hotel: DocumentType): Observable<DocumentType> {
    return this.http.delete<DocumentType>('document-types', { body: hotel });
  }
}
