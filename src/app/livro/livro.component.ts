import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { ResultadoLivroDto } from '../interface/ResultadoLivroDto.interface';

@Component({
  selector: 'app-livro',
  imports: [],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.scss'
})
export class LivrosComponent implements OnInit {
   livros: ResultadoLivroDto[] = [];

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.buscarLivros().subscribe((data) => {
      this.livros = data;
    }, error => {
      console.error('Erro ao carregar livros', error);
    });
  }
}
