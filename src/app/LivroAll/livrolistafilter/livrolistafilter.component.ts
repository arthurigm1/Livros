import { Component, Input, SimpleChanges } from '@angular/core';
import { LivroService } from '../../services/livro/livro.service';
import { CommonModule } from '@angular/common';
import { DivComponent } from '../../div/div.component';

@Component({
  selector: 'app-livrolistafilter',
  imports: [CommonModule, DivComponent],
  templateUrl: './livrolistafilter.component.html',
  styleUrl: './livrolistafilter.component.scss',
})
export class LivrolistafilterComponent {
  @Input() livros: any[] = []; // Recebe os livros do componente pai

  constructor(private livroService: LivroService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['livros']) {
      // Acessando com a notação de índice
      this.livros = changes['livros'].currentValue; // Atualiza os livros quando houver mudança
      console.log(this.livros); // Aqui você pode processar os livros, se necessário
    }
  }
}
