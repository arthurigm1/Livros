import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutorService } from '../services/autores/autor.service';
import { AutorDTO } from '../interface/AutorDetalhes.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autordetalhes',
  imports: [CommonModule],
  templateUrl: './autordetalhes.component.html',
  styleUrl: './autordetalhes.component.scss',
})
export class AutordetalhesComponent {
  @Output() voltar = new EventEmitter<void>();
  @Input() autorid: number | null = null;
  @Output() componenteAlterado: EventEmitter<string> =
    new EventEmitter<string>();
  isLoading: boolean = true;
  autor: any = null;

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    if (this.autorid !== null) {
      this.carregarDetalhesAutor();
    }
  }

  // Método para carregar detalhes do autor
  carregarDetalhesAutor(): void {
    if (this.autorid !== null) {
      this.autorService.obterDetalhes(this.autorid.toString()).subscribe(
        (autor: AutorDTO) => {
          this.isLoading = false;
          this.autor = autor;
        },
        (error) => {
          console.error('Erro ao carregar detalhes do autor', error);
          this.isLoading = false;
        }
      );
    }
  }

  voltarParaAutores() {
    this.voltar.emit();
  }
}
