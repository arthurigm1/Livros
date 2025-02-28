import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, timeout } from 'rxjs';
import { PedidoAdminDto } from '../../interface/PedidoAdmindto';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://fullstacklivros-production.up.railway.app/pedido';
  private timeoutDuration = 15000;
  constructor(private http: HttpClient) {}

  getResumoPedido(): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.apiUrl}/resumo`, { headers })
      .pipe(timeout(this.timeoutDuration));
  }

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
  baixarRelatorioPedidos(): Observable<Blob> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get(`${this.apiUrl}/relatorio`, {
        headers: headers,
        responseType: 'blob',
      })
      .pipe(timeout(this.timeoutDuration));
  }
  getallPedidos(): Observable<PedidoAdminDto[]> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<PedidoAdminDto[]>(`${this.apiUrl}/pedidos`, {
        headers,
      })
      .pipe(timeout(this.timeoutDuration));
  }
}
