import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../../interface/Endereco.interface';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private baseUrl = 'http://localhost:8080/enderecos'; // URL da API para endereços

  constructor(private http: HttpClient) {}

  // Carregar todos os endereços do usuário
  carregarEnderecos(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl, { headers });
  }

  // Salvar um novo endereço
  salvarEndereco(endereco: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, endereco, { headers });
  }

  // Deletar um endereço
  deletarEndereco(id: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  // Editar um endereço
  editarEndereco(id: string, endereco: Endereco): Observable<Endereco> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Endereco>(`${this.baseUrl}/${id}`, endereco, {
      headers,
    });
  }

  // Buscar informações de um CEP utilizando a API ViaCEP
  buscarCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }
}
