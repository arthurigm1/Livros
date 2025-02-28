import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditoraService } from '../../services/editora/editora.service';
import { LivroService } from '../../services/livro/livro.service';
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
  @Output() componenteAlterado: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() livrosAtualizados: EventEmitter<any[]> = new EventEmitter<any[]>();
  isLoading: boolean = true;
  constructor(
    private editoraService: EditoraService,
    private livroService: LivroService
  ) {}

  ngOnInit() {
    this.editoraService.getEditora().subscribe((dados) => {
      this.editoras = dados;
      this.isLoading = false;
    });
  }
  buscarLivros(editoraNome: string) {
    const filtro = {
      nomeEditora: editoraNome,
    };

    this.livroService.buscarLivrosComFiltros(filtro).subscribe(
      (livros) => {
        this.livrosAtualizados.emit(livros);
        this.componenteAlterado.emit('filter');
      },
      (error) => {
        console.error('Erro ao buscar livros', error);
      }
    );
  }
}
