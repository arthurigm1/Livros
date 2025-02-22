import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {}

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
}
