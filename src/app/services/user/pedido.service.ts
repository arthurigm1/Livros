import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://fullstacklivros-production.up.railway.app/pedido';
  private timeoutDuration = 15000;
  constructor(private http: HttpClient) {}

  criarPedido(
    pedido: any,
    enderecoId: any
  ): Observable<{ qrCodeUrl: string; pixCopiaECola: string }> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<{ qrCodeUrl: string; pixCopiaECola: string }>(
      `${this.apiUrl}/${enderecoId}`,
      pedido,
      {
        headers: headers,
      }
    );
  }

  getPedidos(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.apiUrl}`, { headers })
      .pipe(timeout(this.timeoutDuration));
  }

  baixarRelatorio(id: number): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get(`${this.apiUrl}/${id}/relatorio`, {
        headers: headers,
        responseType: 'blob',
      })
      .pipe(timeout(this.timeoutDuration));
  }
}
