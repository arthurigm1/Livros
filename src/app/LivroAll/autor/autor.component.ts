import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../services/autor.service';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

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
  isLoading: boolean = true;

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores(): void {
    this.autorService.getAutores().subscribe(
      (data) => {
        this.autores = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar autores', error);
        this.isLoading = false;
      }
    );
  }
}
