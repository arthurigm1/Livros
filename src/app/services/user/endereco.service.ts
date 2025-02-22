import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../../interface/Endereco.interface';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private baseUrl =
    'https://fullstacklivros-production.up.railway.app/enderecos';

  constructor(private http: HttpClient) {}

  carregarEnderecos(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl, { headers });
  }

  salvarEndereco(endereco: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, endereco, { headers });
  }

  deletarEndereco(id: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  editarEndereco(id: string, endereco: Endereco): Observable<Endereco> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Endereco>(`${this.baseUrl}/${id}`, endereco, {
      headers,
    });
  }

  buscarCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }
}
