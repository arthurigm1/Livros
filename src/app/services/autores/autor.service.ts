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
}
