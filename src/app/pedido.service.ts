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
    const token = localStorage.getItem('authToken'); // Obtendo o token de autenticação do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Enviando a requisição POST com o corpo do pedido e o cabeçalho de autorização
    return this.http.post(this.apiUrl, pedido, {
      headers: headers,
      responseType: 'text', // Especificando que a resposta será do tipo texto (para o QR Code em base64)
    }) as Observable<string>;
  }

  getPedidos(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token de autenticação do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  // Baixar relatório do pedido
  baixarRelatorio(id: number): Observable<Blob> {
    const token = localStorage.getItem('authToken'); // Obtendo o token de autenticação do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${id}/relatorio`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
