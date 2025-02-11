import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
 private apiUrl = `http://localhost:8080`;  // Altere 'environment.apiUrl' para a URL base da sua API
 constructor(private http: HttpClient) { }

    getAutores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/autores');
  }
}
