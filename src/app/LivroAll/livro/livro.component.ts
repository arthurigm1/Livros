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
import { AuthService } from '../../services/auth.service';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-livro',
  imports: [CommonModule, FilterComponent, DivComponent],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.scss',
  animations: [
    trigger('fadeInList', [
      transition(':enter', [
        query('.livro-card', style({ opacity: 0 }), { optional: true }),
        query(
          '.livro-card',
          stagger('500ms', [animate('500ms ease-out', style({ opacity: 1 }))]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class LivrosComponent implements OnInit {
  todosLivros: ResultadoLivroDto[] = [];
  livros: ResultadoLivroDto[] = [];
  isLoggedIn$: Observable<boolean>;
  favoritosIds: number[] = [];
  @Output() livroSelecionado = new EventEmitter<any>();

  @Output() componenteAlterado: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() livrofiltro: EventEmitter<number> = new EventEmitter<number>();
  paginaAtual: number = 1;
  tamanhoPagina: number = 4;
  totalPaginas: number = 0;
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
    this.livroService.buscarLivros().subscribe(
      (data) => {
        this.todosLivros = data.map((livro) => {
          livro.favorito = this.isFavorito(livro);
          return livro;
        });
        this.totalPaginas = Math.ceil(
          this.todosLivros.length / this.tamanhoPagina
        );
        this.atualizarPagina();
      },
      (error) => {
        console.error('Erro ao carregar livros', error);
      }
    );

    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.favoritoService.obterLivrosFavoritos().subscribe(
          (favoritos: ResultadoLivroDto[]) => {
            this.favoritosIds = favoritos.map((livro) => livro.id);
            this.todosLivros = this.todosLivros.map((livro) => {
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
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    this.livros = this.todosLivros.slice(inicio, fim);
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
  private isFavorito(livro: ResultadoLivroDto): boolean {
    return this.favoritosIds.includes(livro.id);
  }
  onFiltrarLivrosDiv(event: any) {
    this.carregarLivros(event);
  }

  onFiltrar(filtro: any) {
    this.carregarLivros(filtro);
  }

  adicionarLivroAoCarrinho(livroId: number): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.carrinhoService.adicionarAoCarrinho(livroId).subscribe({
          next: (response: any) => {
            this.toastService.success('Livro adicionado no Carrinho');
          },
          error: () => this.toastService.error('Erro Interno!'),
        });
      } else {
        this.toastService.error(
          'Você precisa estar logado para adicionar um livro no Carrinho',
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
    localStorage.setItem('favoritos', JSON.stringify(this.favoritosIds));
  }

  selecionarLivro(id: number) {
    this.componenteAlterado.emit('detalhesLivro');
    this.livrofiltro.emit(id);
  }
}
