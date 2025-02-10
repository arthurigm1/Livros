import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient , private router: Router) { } // INICIALIZANDO O HTTP CLIENT

  
  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password }).pipe(
      tap((value) => {
        console.log(value)
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        sessionStorage.setItem("id", value.id)
        
      })
    )
  }

  signup(name: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, email, password }).pipe(
      tap((value) => {

        sessionStorage.setItem("username", value.name)
        
      })
    )
  }
}