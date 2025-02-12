import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc'; // Importando o OAuthService

@Injectable({
  providedIn: 'root' // Fornecendo globalmente o AuthService
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

 

  // Função que verifica se o token existe e é válido
  private checkToken(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    try {
      const decodedToken = this.decodeToken(token);
      return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
      return false;
    }
  }

  // Função que decodifica o JWT para acessar os dados (payload)
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)); // Decodifica o payload (em base64)
  }

  // Função de login: armazena o token e atualiza o estado de login
  login(token: string): void {
    localStorage.setItem('authToken', token);
    
    this.isLoggedInSubject.next(true);
  }

  // Função de logout: remove o token e atualiza o estado de login
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('id');
    this.isLoggedInSubject.next(false);
  }


}
