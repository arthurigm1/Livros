import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

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
  private apiUrl = 'https://fullstacklivros-production.up.railway.app/usuario';
  private timeoutDuration = 15000;
  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Usuario>(`${this.apiUrl}`, { headers })
      .pipe(timeout(this.timeoutDuration));
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .put<Usuario>(`${this.apiUrl}`, usuario, { headers })
      .pipe(timeout(this.timeoutDuration));
  }

  alterarSenha(alterarSenhaDTO: any): Observable<string> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .put<string>(`${this.apiUrl}/changepass`, alterarSenhaDTO, {
        headers,
      })
      .pipe(timeout(this.timeoutDuration));
  }
}
