import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LivroService } from '../../services/livro/livro.service';
import { CommonModule } from '@angular/common';
import { DivComponent } from '../../div/div.component';
import { Observable } from 'rxjs';
import { CarrinhoService } from '../../services/livro/carrinho.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { FavoritoService } from '../../services/livro/favorito.service';
import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';

@Component({
  selector: 'app-livrolistafilter',
  imports: [CommonModule, DivComponent],
  templateUrl: './livrolistafilter.component.html',
  styleUrl: './livrolistafilter.component.scss',
})
export class LivrolistafilterComponent implements OnInit {
  @Input() livros: any[] = [];
  @Output() componenteAlterado: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() livrofiltro: EventEmitter<number> = new EventEmitter<number>();
  isLoggedIn$: Observable<boolean>;
  favoritosIds: number[] = [];
  constructor(
    private livroService: LivroService,
    private carrinhoService: CarrinhoService,
    private toastService: ToastrService,
    private authService: AuthService,
    private favoritoService: FavoritoService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  ngOnInit(): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.favoritoService.obterLivrosFavoritos().subscribe(
          (favoritos: ResultadoLivroDto[]) => {
            this.favoritosIds = favoritos.map((livro) => livro.id);
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
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['livros']) {
      this.livros = changes['livros'].currentValue;
    }
  }
  private isFavorito(livro: ResultadoLivroDto): boolean {
    return this.favoritosIds.includes(livro.id);
  }
  selecionarLivro(id: number) {
    this.componenteAlterado.emit('detalhesLivro');
    this.livrofiltro.emit(id);
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
    localStorage.setItem('favoritos', JSON.stringify(this.favoritosIds));
  }
}
