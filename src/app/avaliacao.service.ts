import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvaliacaoLivro } from './interface/AvaliacaoLivro.interface';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private apiUrl = 'http://localhost:8080/avaliacoes';
  constructor(private http: HttpClient) {}

  getAvaliacoes(livroId: string): Observable<AvaliacaoLivro[]> {
    return this.http.get<AvaliacaoLivro[]>(`${this.apiUrl}/${livroId}`);
  }

  adicionarAvaliacao(
    livroId: string,
    avaliacao: AvaliacaoLivro
  ): Observable<AvaliacaoLivro> {
    return this.http.post<AvaliacaoLivro>(
      `${this.apiUrl}/${livroId}`,
      avaliacao
    );
  }
}
