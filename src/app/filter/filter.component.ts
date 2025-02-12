import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  filtro = {
    isbn: '',
    titulo: '',
    autor: '',
    precoMin: null,
    precoMax: null,
    genero: '',
    anoPublicacao: null
  };

  @Output() filtrar = new EventEmitter<any>();

  aplicarFiltro() {
    this.filtrar.emit(this.filtro);
  }

  limparFiltro() {
    this.filtro = {
      isbn: '',
      titulo: '',
      autor: '',
      precoMin: null,
      precoMax: null,
      genero: '',
      anoPublicacao: null
    };
    this.filtrar.emit(this.filtro);
  }
}
