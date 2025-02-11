import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadoLivroDto } from '../interface/ResultadoLivroDto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

   private apiUrl = `http://localhost:8080`;  // Altere 'environment.apiUrl' para a URL base da sua API

  constructor(private httpClient: HttpClient , private router: Router) { } // INICIALIZANDO O HTTP CLIENT

  // Método para obter todos os livros com paginação
  buscarLivros(): Observable<ResultadoLivroDto[]> {
    return this.httpClient.get<ResultadoLivroDto[]>(this.apiUrl + '/livros');
  }
}
