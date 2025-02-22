import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LivroCarrinho {
  livroId: number;
  titulo: string;
  preco: number;
  quantidade: number;
}
@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private apiUrl = `http://localhost:8080`;
  constructor(private httpClient: HttpClient, private router: Router) {}

  adicionarAoCarrinho(livroId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/carrinhos`;
    const body = { livroId: livroId };

    return this.httpClient.post<any>(url, body, { headers });
  }

  listarItens(): Observable<LivroCarrinho[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<LivroCarrinho[]>(this.apiUrl + '/carrinhos', {
      headers,
    });
  }
  removerUmaQuantidade(livroId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/carrinhos/${livroId}`;

    return this.httpClient.delete<any>(url, { headers });
  }

  atualizarQuantidade(
    livroId: string,
    quantidade: number
  ): Observable<LivroCarrinho> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.apiUrl}/${livroId}`;

    const body = { quantidade };

    return this.httpClient.put<LivroCarrinho>(url, body, { headers });
  }
}
