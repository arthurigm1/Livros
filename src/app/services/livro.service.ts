import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadoLivroDto } from '../interface/ResultadoLivroDto.interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

   private apiUrl = `http://localhost:8080/livros`;  // Altere 'environment.apiUrl' para a URL base da sua API

  constructor(private httpClient: HttpClient , private router: Router) { } // INICIALIZANDO O HTTP CLIENT

  // Método para obter todos os livros
  buscarLivros() {
    return this.httpClient.get<ResultadoLivroDto[]>(this.apiUrl + '/livros')
  }
}
