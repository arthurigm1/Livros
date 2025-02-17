import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.apiUrl}`, { headers });
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Usuario>(`${this.apiUrl}`, usuario, { headers });
  }

  alterarSenha(alterarSenhaDTO: any): Observable<string> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<string>(`${this.apiUrl}/changepass`, alterarSenhaDTO, {
      headers,
    });
  }
}
