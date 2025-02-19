import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  CarouselComponent,
  CarouselModule,
  ThemeDirective,
} from '@coreui/angular';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeDirective],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filtro = {
    isbn: '',
    titulo: '',
    autor: '',
    precoMin: null,
    precoMax: null,
    genero: '',
    anoPublicacao: null,
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
      anoPublicacao: null,
    };
    this.filtrar.emit(this.filtro);
  }
}
