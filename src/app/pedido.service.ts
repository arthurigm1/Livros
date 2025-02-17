import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient) {}

  criarPedido(pedido: any): Observable<string> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Corrigindo a sintaxe do HTTP POST
    return this.http.post<string>(this.apiUrl, pedido, {
      headers: headers,
      responseType: 'text' as 'json', // Especificando o tipo de resposta como texto
    });
  }
}
