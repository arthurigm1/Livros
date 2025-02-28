import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorDTO } from '../../interface/AutorDetalhes.dto';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private apiUrl = `https://fullstacklivros-production.up.railway.app`;
  constructor(private http: HttpClient) {}

  getAutores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/autores');
  }
  obterDetalhes(id: string): Observable<AutorDTO> {
    return this.http.get<AutorDTO>(`${this.apiUrl}/autores/${id}`);
  }
  getAutoresAdmin(): Observable<any[]> {
    const token = localStorage.getItem('adminToken');
    return this.http.get<any[]>(`${this.apiUrl}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  salvarAutor(autor: any): Observable<void> {
    const token = localStorage.getItem('adminToken');
    return this.http.post<void>(`${this.apiUrl}/autores`, autor, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  excluirAutor(id: string): Observable<void> {
    const token = localStorage.getItem('adminToken');
    return this.http.delete<void>(`${this.apiUrl}/autores/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  atualizarAutor(id: string, autor: Partial<AutorDTO>): Observable<void> {
    const token = localStorage.getItem('adminToken');
    return this.http.put<void>(`${this.apiUrl}/autores/${id}`, autor, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
