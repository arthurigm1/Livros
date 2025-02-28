import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interface/User.interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interface/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class UsuarioadminService {
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.apiUrl}/usuarios`, { headers });
  }

  deleteUser(id: string): Observable<void> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  signup(email: string, senha: string) {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<LoginResponse>(
      this.apiUrl + '/register',
      { email, senha },
      { headers }
    );
  }
}
