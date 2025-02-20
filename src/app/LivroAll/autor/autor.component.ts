import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { AutorService } from '../../services/autores/autor.service';

@Component({
  selector: 'app-autor',
  imports: [CommonModule],
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss'],
  animations: [
    trigger('fadeInList', [
      transition(':enter', [
        query('.autor-item', style({ opacity: 0 }), { optional: true }), // Inicialmente todos os itens ficam invisíveis
        query(
          '.autor-item',
          stagger('500ms', [animate('1000ms ease-out', style({ opacity: 1 }))]),
          { optional: true }
        ), // Aparecem um a um com 50ms de intervalo
      ]),
    ]),
  ],
})
export class AutorComponent implements OnInit {
  autores: any[] = [];
  autoresExibidos: any[] = [];
  isLoading: boolean = true;
  paginaAtual: number = 1;
  tamanhoPagina: number = 5;
  totalPaginas: number = 0;
  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores(): void {
    this.autorService.getAutores().subscribe(
      (data) => {
        this.autores = data;
        this.isLoading = false;
        this.totalPaginas = Math.ceil(this.autores.length / this.tamanhoPagina);
        this.atualizarPagina();
      },
      (error) => {
        console.error('Erro ao carregar autores', error);
        this.isLoading = false;
      }
    );
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    this.autoresExibidos = this.autores.slice(inicio, fim);
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPagina();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPagina();
    }
  }
}
