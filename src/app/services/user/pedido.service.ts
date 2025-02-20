import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient) {}

  criarPedido(pedido: any, enderecoId: any): Observable<string> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/${enderecoId}`, pedido, {
      headers: headers,
      responseType: 'text',
    }) as Observable<string>;
  }

  getPedidos(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  baixarRelatorio(id: number): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${id}/relatorio`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
