import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private isAdminLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkAdminToken()
  );
  isAdminLoggedIn$: Observable<boolean> =
    this.isAdminLoggedInSubject.asObservable();

  private apiUrl =
    'https://fullstacklivros-production.up.railway.app/admin/login';

  constructor(private http: HttpClient) {}

  private checkToken(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    try {
      const decodedToken = this.decodeToken(token);
      return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return false;
    }
  }
  private checkAdminToken(): boolean {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;
    try {
      const decodedToken = this.decodeToken(token);
      return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      console.error('Erro ao decodificar o admin token', error);
      return false;
    }
  }
  isAdminAuthenticated(): boolean {
    return this.checkAdminToken();
  }
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('id');
    this.isLoggedInSubject.next(false);
  }

  logoutAdmin(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('usuarioRole');
    this.isAdminLoggedInSubject.next(false);
  }

  setToken(token: string, role: string): void {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('usuarioRole', role);
  }

  loginAdmin(email: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, senha }).pipe(
      tap((res) => {
        console.log('Resposta recebida:', res);
        if (res.token && res.usuarioRole) {
          this.setToken(res.token, res.usuarioRole);
        }
      })
    );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  isAdmin(): boolean {
    return localStorage.getItem('usuarioRole') === 'ADMIN';
  }
}
