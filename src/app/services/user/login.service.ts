import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap, timeout } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interface/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'https://fullstacklivros-production.up.railway.app/auth';
  private timeoutDuration = 15000;

  constructor(private httpClient: HttpClient, private router: Router) {} // INICIALIZANDO O HTTP CLIENT

  login(email: string, senha: string) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/login', { email, senha })
      .pipe(
        timeout(this.timeoutDuration),
        tap((value) => {
          localStorage.setItem('id', value.id);
        })
      );
  }

  signup(nome: string, email: string, senha: string) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/register', { email, nome, senha })
      .pipe(
        timeout(this.timeoutDuration),
        tap((value) => {
          sessionStorage.setItem('username', value.name);
        })
      )
      .pipe(timeout(this.timeoutDuration));
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient
      .post(`${this.apiUrl}/forgot-password`, { email })
      .pipe(timeout(this.timeoutDuration));
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.httpClient
      .post(`${this.apiUrl}/reset-password`, {
        token,
        password,
      })
      .pipe(timeout(this.timeoutDuration));
  }

  verifyAccount(code: string): Observable<string> {
    return this.httpClient.get<string>(` ${this.apiUrl}/verify?code=${code}`);
  }
}
