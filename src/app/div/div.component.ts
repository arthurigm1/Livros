import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../LoginAll/login/login.component';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

import {
  CarrinhoService,
  LivroCarrinho,
} from '../services/livro/carrinho.service';
import { FormsModule } from '@angular/forms';
import { LivroService } from '../services/livro/livro.service';

@Component({
  selector: 'app-div',
  imports: [CommonModule, FormsModule],
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.scss'],
})
export class DivComponent {
  @Output() componenteAlterado: EventEmitter<string> =
    new EventEmitter<string>();

  isLoggedIn$: Observable<boolean>;
  mostrarCarrinho = false;
  itensCarrinho: LivroCarrinho[] = [];
  dropdownAberto = false;

  filtroSelecionado: string = '';
  termoPesquisa: string = '';

  @Input() quantidadeCarrinho: number = 0;
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private eRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private livroService: LivroService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  alterarComponente(componente: string): void {
    this.componenteAlterado.emit(componente);
  }

  irParaAutores(): void {
    this.router.navigate(['/autores']);
  }

  abrirLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }
  perfilMenuAberto: boolean = false;

  togglePerfilMenu() {
    this.perfilMenuAberto = !this.perfilMenuAberto;
  }

  logout(): void {
    this.authService.logout();
    this.toastService.info('Logout efetuado com sucesso');
    location.reload();
  }

  ngOnInit() {
    this.carregarCarrinho();
    initFlowbite();
  }
  toggleCarrinho() {
    this.mostrarCarrinho = !this.mostrarCarrinho;
  }

  adicionarItemCarrinho(item: any): void {
    this.itensCarrinho.push(item);
    this.cdr.detectChanges();
  }

  carregarCarrinho(): void {
    this.carrinhoService.listarItens().subscribe(
      (itens) => {
        this.itensCarrinho = itens;
      },
      (error) => {
        console.error('Erro ao carregar o carrinho:', error);
      }
    );
  }

  get totalCarrinho(): number {
    return this.itensCarrinho.reduce(
      (total, item) => total + item.preco * (item.quantidade || 1),
      0
    );
  }

  adicionarLivroAoCarrinho(livroId: number): void {
    this.carrinhoService.adicionarAoCarrinho(livroId).subscribe(
      (response) => {
        this.toastService.success('Livro adicionado no Carrinho', '', {
          positionClass: 'toast-top-center',
        });
        this.carregarCarrinho();
        this.cdr.detectChanges();
      },
      (error) => {
        this.toastService.error('Erro Interno!', '', {
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  removerLivro(livroId: number): void {
    const item = this.itensCarrinho.find((item) => item.livroId === livroId);

    if (item && item.quantidade > 1) {
      item.quantidade--;

      this.carrinhoService.removerUmaQuantidade(livroId).subscribe({
        next: (response) => {
          this.toastService.success(
            'Uma unidade do livro removida com sucesso!',
            '',
            {
              positionClass: 'toast-top-center',
            }
          );
        },
        error: () => {
          item.quantidade++;
          this.toastService.error('Erro ao remover o livro', '', {
            positionClass: 'toast-top-center',
          });
        },
      });
    } else if (item && item.quantidade === 1) {
      this.itensCarrinho = this.itensCarrinho.filter(
        (item) => item.livroId !== livroId
      );

      this.carrinhoService.removerUmaQuantidade(livroId).subscribe({
        next: (response) => {
          this.toastService.success(
            'Livro removido do carrinho com sucesso!',
            '',
            {
              positionClass: 'toast-top-center',
            }
          );
        },
        error: () => {
          this.itensCarrinho.push(item);
          this.toastService.error('Erro ao remover o livro', '', {
            positionClass: 'toast-top-center',
          });
        },
      });
    }
  }

  @HostListener('document:click', ['$event'])
  fecharCarrinho(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.carrinho-container') && this.mostrarCarrinho) {
      this.mostrarCarrinho = false;
    }
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.perfilMenuAberto = false;
    }
  }

  livros: any[] = [];

  @Output() livrosAtualizados = new EventEmitter<any[]>();
  aplicarFiltro() {
    const filtroAtualizado = {
      isbn: '',
      titulo: '',
      autor: '',
      genero: '',
      anoPublicacao: null,
      nomeEditora: '',
    };

    if (this.filtroSelecionado === 'isbn') {
      filtroAtualizado.isbn = this.termoPesquisa;
    } else if (this.filtroSelecionado === 'titulo') {
      filtroAtualizado.titulo = this.termoPesquisa;
    } else if (this.filtroSelecionado === 'autor') {
      filtroAtualizado.autor = this.termoPesquisa;
    } else if (this.filtroSelecionado === 'nomeEditora') {
      filtroAtualizado.nomeEditora = this.termoPesquisa;
    }

    this.livroService.buscarLivrosComFiltros(filtroAtualizado).subscribe(
      (livros) => {
        this.livrosAtualizados.emit(livros);
        this.termoPesquisa = '';
      },
      (error) => {
        console.error('Erro ao buscar livros', error);
      }
    );
  }
}
