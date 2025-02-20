import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../services/editora.service';
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

  constructor(private editoraService: EditoraService) {}

  ngOnInit() {
    this.editoraService.getEditora().subscribe((dados) => {
      this.editoras = dados;
    });
  }
}
