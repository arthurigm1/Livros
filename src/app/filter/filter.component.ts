import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [CommonModule,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  filtro = {
    titulo: '',
    autor: '',
    precoMin: null,
    precoMax: null
  };

  @Output() filtrar = new EventEmitter<any>();

  aplicarFiltro() {
    this.filtrar.emit(this.filtro);
  }

  limparFiltro() {
    this.filtro = {
      titulo: '',
      autor: '',
      precoMin: null,
      precoMax: null
    };
    this.filtrar.emit(this.filtro);
  }
}
