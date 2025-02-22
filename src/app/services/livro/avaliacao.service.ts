import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvaliacaoLivro } from '../../interface/AvaliacaoLivro.interface';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private apiUrl =
    'https://fullstacklivros-production.up.railway.app/avaliacoes';
  constructor(private http: HttpClient) {}

  getAvaliacoes(livroId: number): Observable<AvaliacaoLivro[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AvaliacaoLivro[]>(`${this.apiUrl}/${livroId}`, {
      headers,
    });
  }

  getMediaAvaliacao(livroId: number): Observable<{ mediaNota: number }> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ mediaNota: number }>(
      `${this.apiUrl}/media/${livroId}`,
      {
        headers,
      }
    );
  }

  adicionarAvaliacao(
    livroId: string,
    avaliacao: AvaliacaoLivro
  ): Observable<AvaliacaoLivro> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<AvaliacaoLivro>(
      `${this.apiUrl}/${livroId}`,
      avaliacao,
      { headers }
    );
  }
}
