import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritoService {
  private apiUrl = `https://fullstacklivros-production.up.railway.app`;
  constructor(private http: HttpClient) {}

  favoritarLivro(livro: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const favoritoRequest = {
      livro: livro,
    };

    return this.http.post(this.apiUrl + '/favoritos', favoritoRequest, {
      headers,
    });
  }

  desfavoritarLivro(livroId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const favoritoRequest = {
      livro: livroId,
    };

    return this.http.post(
      this.apiUrl + '/favoritos/desfavoritar',
      favoritoRequest,
      { headers }
    );
  }

  obterLivrosFavoritos(): Observable<ResultadoLivroDto[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ResultadoLivroDto[]>(`${this.apiUrl}/favoritos`, {
      headers,
    });
  }
}
