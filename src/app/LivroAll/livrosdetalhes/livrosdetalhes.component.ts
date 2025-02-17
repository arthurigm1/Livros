import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-livrosdetalhes',
  imports: [CommonModule],
  templateUrl: './livrosdetalhes.component.html',
  styleUrl: './livrosdetalhes.component.scss',
})
export class LivrosdetalhesComponent {
  @Input() livroId: number | null = null; // Agora recebe apenas o ID
  @Output() voltar = new EventEmitter<void>();

  voltarParaLista() {
    this.voltar.emit(); // Emite o evento para voltar
  }
}
