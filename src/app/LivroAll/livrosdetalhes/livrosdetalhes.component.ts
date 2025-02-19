import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro/livro.service';
import { LivroDetalhadoDto } from '../../interface/livro-detalhado.dto';

@Component({
  selector: 'app-livrosdetalhes',
  standalone: true, // Adiciona suporte para standalone components
  imports: [CommonModule],
  templateUrl: './livrosdetalhes.component.html',
  styleUrl: './livrosdetalhes.component.scss',
})
export class LivrosdetalhesComponent implements OnInit {
  @Input() livroId: number | null = null;
  @Output() voltar = new EventEmitter<void>();

  livro!: LivroDetalhadoDto;
  erro: string = '';

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    if (this.livroId) {
      this.livroService.obterDetalhes(this.livroId.toString()).subscribe({
        next: (data) => (this.livro = data),
        error: () => (this.erro = 'Livro não encontrado ou ID inválido'),
      });
    }
  }

  voltarParaLista() {
    this.voltar.emit();
  }
}
