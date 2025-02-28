import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getEditoraAdmin(): Observable<any[]> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/admin`, {
      headers,
    });
  }

  deletarEditora(id: string): Observable<void> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers,
    });
  }
  salvarEditora(editora: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}`, editora, {
      headers,
    });
  }

  editarEditora(id: string, editora: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${id}`, editora, {
      headers,
    });
  }
}
