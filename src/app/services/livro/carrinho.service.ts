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
  private apiUrl = `http://localhost:8080`; // Altere 'environment.apiUrl' para a URL base da sua API
  constructor(private httpClient: HttpClient, private router: Router) {}

  adicionarAoCarrinho(livroId: number): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/carrinhos`;
    const body = { livroId: livroId };

    return this.httpClient.post<any>(url, body, { headers });
  }

  listarItens(): Observable<LivroCarrinho[]> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<LivroCarrinho[]>(this.apiUrl + '/carrinhos', {
      headers,
    });
  }
  removerUmaQuantidade(livroId: number): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/carrinhos/${livroId}`; // Passando livroId diretamente na URL

    return this.httpClient.delete<any>(url, { headers });
  }

  atualizarQuantidade(
    livroId: string,
    quantidade: number
  ): Observable<LivroCarrinho> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.apiUrl}/${livroId}`; // Caminho para o endpoint PUT

    // Dados a serem enviados no corpo da requisição
    const body = { quantidade };

    return this.httpClient.put<LivroCarrinho>(url, body, { headers }); // Envia o corpo com os dados e os headers
  }
}
