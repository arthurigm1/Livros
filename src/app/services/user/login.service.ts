import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient , private router: Router) { } // INICIALIZANDO O HTTP CLIENT

  
  login(email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, senha }).pipe(
      tap((value) => {
        console.log(value)
        //sessionStorage.setItem("auth-token", value.token)
        localStorage.setItem("id", value.id)
        //sessionStorage.setItem("id", value.id)
        
      })
    )
  }

  signup(nome: string, email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { nome, email, senha }).pipe(
      tap((value) => {

        sessionStorage.setItem("username", value.name)
        
      })
    )
  }
  
}