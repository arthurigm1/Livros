import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditoraService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://fullstacklivros-production.up.railway.app/editoras';
  getEditora(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
