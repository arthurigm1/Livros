import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditoraService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/editoras'; // URL da sua API

  getEditora(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
