import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'https://fullstacklivros-production.up.railway.app/auth';

  constructor(private httpClient: HttpClient, private router: Router) {} // INICIALIZANDO O HTTP CLIENT

  login(email: string, senha: string) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/login', { email, senha })
      .pipe(
        tap((value) => {
          localStorage.setItem('id', value.id);
        })
      );
  }

  signup(nome: string, email: string, senha: string) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/register', { email, nome, senha })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('username', value.name);
        })
      );
  }
  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/reset-password`, {
      token,
      password,
    });
  }
}
