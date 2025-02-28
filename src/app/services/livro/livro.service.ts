import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';
import { LivroDetalhadoDto } from '../../interface/livro-detalhado.dto';
import { LivrosAdminDto } from '../../interface/LivrosAdminDto.interface';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private livrosSubject = new BehaviorSubject<any[]>([]);
  livros$ = this.livrosSubject.asObservable();

  private apiUrl = `https://fullstacklivros-production.up.railway.app`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  buscarLivros(): Observable<ResultadoLivroDto[]> {
    return this.httpClient.get<ResultadoLivroDto[]>(this.apiUrl + '/livros');
  }
  buscarLivrosadmin(): Observable<LivrosAdminDto[]> {
    return this.httpClient.get<LivrosAdminDto[]>(`${this.apiUrl}/livros`);
  }
  cadastrarLivro(CadastroLivroDto: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(`${this.apiUrl}/livros`, CadastroLivroDto, {
      headers,
    });
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

  deletarlivro(id: number): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete(`${this.apiUrl}/livros/${id}`, {
      headers,
    });
  }

  atualizarLivro(id: string, livroAtualizado: any): Observable<void> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<void>(
      `${this.apiUrl}/livros/${id}`,
      livroAtualizado,
      {
        headers,
      }
    );
  }
}
