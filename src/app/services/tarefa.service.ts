import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl: string = "https://localhost:8080/tarefas"; // URL da API de tarefas

  constructor(private http: HttpClient) {}

  // Agora a URL vai ter o id do usuário
  criarTarefa(tarefa: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    const userId = sessionStorage.getItem('id'); // Recupera o ID do usuário

    if (!token || !userId) {
      throw new Error('Token ou ID do usuário não encontrados');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // A URL agora inclui o ID do usuário na rota
    const url = `${this.apiUrl}/${userId}`;

    const novaTarefa = {
      nome: tarefa.nome,
      usuarioId: userId
    };

    return this.http.post(url, novaTarefa, { headers });
  }
}
