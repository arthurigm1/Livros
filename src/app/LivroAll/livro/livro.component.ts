import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { AuthService } from '../../services/autores/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FilterComponent } from '../filter/filter.component';
import {
  CarrinhoService,
  LivroCarrinho,
} from '../../services/livro/carrinho.service';
import { LivroService } from '../../services/livro/livro.service';
import { FavoritoService } from '../../services/livro/favorito.service';
import { DivComponent } from '../../div/div.component';
import { SwiperModule } from 'swiper/types';

@Component({
  selector: 'app-livro',
  imports: [CommonModule, FilterComponent, DivComponent],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.scss',
  animations: [
    trigger('fadeInList', [
      transition(':enter', [
        query('div', style({ opacity: 0 }), { optional: true }), // Inicialmente todos os itens ficam invisíveis
        query(
          'div',
          stagger('300ms', [animate('500ms ease-out', style({ opacity: 1 }))]),
          { optional: true }
        ), // Aparecem um a um com 100ms de intervalo
      ]),
    ]),
  ],
})
export class LivrosComponent implements OnInit {
  itensCarrinho: LivroCarrinho[] = [];
  livros: ResultadoLivroDto[] = [];
  isLoggedIn$: Observable<boolean>; // Observável para o estado de login
  favoritosIds: number[] = []; // Lista dos IDs dos livros favoritos do usuário

  constructor(
    private favoritoService: FavoritoService,
    private livroService: LivroService,
    private authService: AuthService,
    private toastService: ToastrService,
    private carrinhoService: CarrinhoService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    // Carregar todos os livros
    this.livroService.buscarLivros().subscribe(
      (data) => {
        this.livros = data.map((livro) => {
          // Verificar se o livro está nos favoritos, usando IDs
          livro.favorito = this.isFavorito(livro);
          return livro;
        });
      },
      (error) => {
        console.error('Erro ao carregar livros', error);
      }
    );

    // Verificar se o usuário está logado e carregar os favoritos
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.favoritoService.obterLivrosFavoritos().subscribe(
          (favoritos: ResultadoLivroDto[]) => {
            // Armazenar apenas os IDs dos livros favoritos
            this.favoritosIds = favoritos.map((livro) => livro.id); // Aqui, pegamos apenas os IDs
            // Marcar os livros como favoritos ou não com base nos IDs
            this.livros = this.livros.map((livro) => {
              livro.favorito = this.isFavorito(livro);
              return livro;
            });
          },
          (error) => {
            console.error('Erro ao carregar favoritos', error);
          }
        );
      }
    });

    const swiper = new Swiper('.swiper', {
      slidesPerView: 3, // Exibe 3 slides por vez
      spaceBetween: 1, // Espaço entre os slides
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  autores = [
    {
      nome: 'Clarice',
      foto: 'assets/autores/clarice.jpg',
    },
    {
      nome: 'Carlos',
      foto: 'assets/autores/carlos.jpg',
    },
    {
      nome: 'Autor 3',
      foto: 'assets/autores/carlos.jpg', // Adicione mais fotos conforme necessário
    },
    {
      nome: 'Autor 4',
      foto: 'assets/autores/carlos.jpg',
    },
    {
      nome: 'Autor 5',
      foto: 'assets/autores/clarice.jpg',
    },
  ];
  private isFavorito(livro: ResultadoLivroDto): boolean {
    // Verificar se o livro está nos favoritos, usando apenas os IDs
    return this.favoritosIds.includes(livro.id);
  }
  onFiltrarLivrosDiv(event: any) {
    this.carregarLivros(event);
  }

  onFiltrar(filtro: any) {
    this.carregarLivros(filtro);
  }

  adicionarLivroAoCarrinho(livroId: number): void {
    this.carrinhoService.adicionarAoCarrinho(livroId).subscribe({
      next: (response: any) => {
        this.toastService.success('Livro adicionado no Carrinho');
      },
      error: () => this.toastService.error('Erro Interno!'),
    });
  }

  carregarLivros(filtro: any = {}): void {
    this.livroService.buscarLivrosComFiltros(filtro).subscribe(
      (data) => {
        this.livros = data;
      },
      (error) => {
        console.error('Erro ao carregar livros', error);
        this.toastService.error('Erro ao carregar livros');
      }
    );
  }

  favoritarLivro(livro: any) {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        if (livro.favorito) {
          // Desfavoritar o livro
          this.favoritoService.desfavoritarLivro(livro.id).subscribe({
            next: (response) => {
              livro.favorito = false;
              this.toastService.success('Livro desfavoritado com sucesso!');
              this.atualizarFavoritosNoLocalStorage();
            },
            error: (error) => {
              this.toastService.error('Erro ao desfavoritar o livro');
            },
          });
        } else {
          // Favoritar o livro
          this.favoritoService.favoritarLivro(livro.id).subscribe({
            next: (response) => {
              livro.favorito = true;
              this.toastService.success('Livro favoritado com sucesso!');
              this.atualizarFavoritosNoLocalStorage();
            },
            error: (error) => {
              this.toastService.error('Erro ao favoritar o livro');
            },
          });
        }
      } else {
        this.toastService.error(
          'Você precisa estar logado para favoritar um livro',
          'Atenção',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          }
        );
      }
    });
  }

  atualizarFavoritosNoLocalStorage() {
    // Atualizar favoritos no LocalStorage com os IDs
    localStorage.setItem('favoritos', JSON.stringify(this.favoritosIds));
  }
  currentIndex = 0;
  totalItems = 2; // Número total de imagens
  offset = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    this.updateOffset();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    this.updateOffset();
  }

  updateOffset() {
    this.offset = -this.currentIndex * 100;
  }
}
