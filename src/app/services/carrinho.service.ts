import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface LivroCarrinho {
  livroId: string;
  titulo: string;
  preco: number;
  quantidade: number;
}
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
   private apiUrl = `http://localhost:8080`;  // Altere 'environment.apiUrl' para a URL base da sua API
  constructor(private httpClient: HttpClient , private router: Router) { } // INICIALIZANDO O HTTP CLIENT


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

    return this.httpClient.get<LivroCarrinho[]>(this.apiUrl + '/carrinhos', { headers });
  }
}