import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface Editora {
  nome: string;
  img: string;
}

@Component({
  selector: 'app-editora',
  imports: [CommonModule],
  templateUrl: './editora.component.html',
  styleUrl: './editora.component.scss',
})
export class EditoraComponent implements OnInit {
  editoras: Editora[] = [];
  private apiUrl = 'http://localhost:8080/editoras'; // URL da sua API

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Editora[]>(this.apiUrl).subscribe((dados) => {
      this.editoras = dados;
    });
  }
}
