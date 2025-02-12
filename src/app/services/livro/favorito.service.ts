import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
   private apiUrl = `http://localhost:8080`; 
  constructor(private http:HttpClient) { }

  favoritarLivro(livro: number): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Adicionando o token ao cabeçalho
    
    const favoritoRequest = {
      livro: livro,
    };
    
    return this.http.post(this.apiUrl + "/favoritos", favoritoRequest, { headers }); // Passando os headers corretamente
  }

   // Função para desfavoritar o livro
  desfavoritarLivro(livroId: number): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const favoritoRequest = {
      livro: livroId, // Aqui você está enviando o ID do livro no formato esperado pelo backend
    };

    return this.http.post(this.apiUrl + "/favoritos/desfavoritar", favoritoRequest, { headers });  // Atualizado para o endpoint correto
  }

    obterLivrosFavoritos(): Observable<ResultadoLivroDto[]> {
          const token = localStorage.getItem('authToken'); // Obtendo o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ResultadoLivroDto[]>(`${this.apiUrl}/favoritos` ,{headers});
  }
}
