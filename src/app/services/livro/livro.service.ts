import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';
import { LivroDetalhadoDto } from '../../interface/livro-detalhado.dto';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private livrosSubject = new BehaviorSubject<any[]>([]); // Observable para manter os livros
  livros$ = this.livrosSubject.asObservable(); // Exposição do Observable

  private apiUrl = `http://localhost:8080`; // Altere 'environment.apiUrl' para a URL base da sua API

  constructor(private httpClient: HttpClient, private router: Router) {} // INICIALIZANDO O HTTP CLIENT

  // Método para obter todos os livros com paginação
  buscarLivros(): Observable<ResultadoLivroDto[]> {
    return this.httpClient.get<ResultadoLivroDto[]>(this.apiUrl + '/livros');
  }

  buscarLivrosComFiltros(filtro: any): Observable<ResultadoLivroDto[]> {
    let params = new HttpParams();

    if (filtro.isbn) {
      params = params.set('isbn', filtro.isbn);
    }
    if (filtro.titulo) {
      params = params.set('titulo', filtro.titulo);
    }
    if (filtro.autor) {
      params = params.set('nome-autor', filtro.autor);
    }
    if (filtro.genero) {
      params = params.set('genero', filtro.genero);
    }
    if (filtro.anoPublicacao) {
      params = params.set('ano-publicacao', filtro.anoPublicacao.toString());
    }
    if (filtro.nomeEditora) {
      params = params.set('nome-editora', filtro.nomeEditora);
    }
    if (filtro.precoMinimo !== null && filtro.precoMinimo !== undefined) {
      params = params.set('preco-minimo', filtro.precoMinimo.toString());
    }
    if (filtro.precoMaximo !== null && filtro.precoMaximo !== undefined) {
      params = params.set('preco-maximo', filtro.precoMaximo.toString());
    }

    return this.httpClient.get<ResultadoLivroDto[]>(this.apiUrl + '/livros', {
      params,
    });
  }

  obterDetalhes(id: string): Observable<LivroDetalhadoDto> {
    return this.httpClient.get<LivroDetalhadoDto>(
      `${this.apiUrl}/livros/${id}`
    );
  }
}
