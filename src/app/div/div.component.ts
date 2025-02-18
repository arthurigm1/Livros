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
  imports: [CommonModule, FormsModule], // Importando o módulo comum e LivrosComponent
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.scss'], // Corrigido para 'styleUrls'
})
export class DivComponent {
  @Output() componenteAlterado: EventEmitter<string> =
    new EventEmitter<string>(); // Emite a alteração do componente

  isLoggedIn$: Observable<boolean>; // Observável para o estado de login
  mostrarCarrinho = false; // Controle para mostrar ou esconder o carrinho
  itensCarrinho: LivroCarrinho[] = [];
  dropdownAberto = false;

  filtroSelecionado: string = ''; // Valor do filtro selecionado
  termoPesquisa: string = ''; // Valor do termo de pesquisa

  // Filtro específico que será passado para o serviço
  filtro = {
    isbn: '',
    titulo: '',
    autor: '',
    genero: '',
    anoPublicacao: null,
  };

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
    this.isLoggedIn$ = this.authService.isLoggedIn$; // Assinando o estado de login do serviço
  }
  carrinho() {
    this.itensCarrinho === null;
  }
  // Método que emite a mudança do componente
  alterarComponente(componente: string): void {
    this.componenteAlterado.emit(componente); // Emite a alteração do componente
  }

  // Método para navegar para a página de autores
  irParaAutores(): void {
    this.router.navigate(['/autores']); // Navega para a rota "/autores"
  }

  // Método para abrir o modal de login
  abrirLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '400px', // Tamanho do modal
    });
  }
  perfilMenuAberto: boolean = false;

  togglePerfilMenu() {
    this.perfilMenuAberto = !this.perfilMenuAberto;
  }

  // Método para realizar o logout
  logout(): void {
    this.authService.logout(); // Chama o serviço de logout
    this.toastService.info('Logout efetuado com sucesso'); // Exibe uma mensagem de sucesso
    location.reload();
  }

  // Método que carrega itens fictícios no carrinho
  ngOnInit() {
    this.carregarCarrinho();
    initFlowbite();
  }
  toggleCarrinho() {
    this.mostrarCarrinho = !this.mostrarCarrinho; // Alterna a visibilidade do carrinho
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
        this.toastService.success('Livro adicionado no Carrinho');
        this.carregarCarrinho();
        this.cdr.detectChanges();
      },
      (error) => {
        this.toastService.error('Erro Interno!');
      }
    );
  }

  removerLivro(livroId: number): void {
    // Encontrar o item no carrinho
    const item = this.itensCarrinho.find((item) => item.livroId === livroId);

    if (item && item.quantidade > 1) {
      // Reduzir a quantidade localmente
      item.quantidade--;

      // Atualizar o carrinho no back-end (só a quantidade)
      this.carrinhoService.removerUmaQuantidade(livroId).subscribe({
        next: (response) => {
          // Atualizar o total do carrinho
          this.toastService.success(
            'Uma unidade do livro removida com sucesso!'
          );
        },
        error: () => {
          // Caso haja erro, revertê-lo localmente
          item.quantidade++;
          this.toastService.error('Erro ao remover o livro');
        },
      });
    } else if (item && item.quantidade === 1) {
      // Se a quantidade for 1, remova o item completamente
      this.itensCarrinho = this.itensCarrinho.filter(
        (item) => item.livroId !== livroId
      );

      // Atualizar o carrinho no back-end para remover completamente o item
      this.carrinhoService.removerUmaQuantidade(livroId).subscribe({
        next: (response) => {
          this.toastService.success('Livro removido do carrinho com sucesso!');
        },
        error: () => {
          // Caso haja erro, recarregar o item
          this.itensCarrinho.push(item);
          this.toastService.error('Erro ao remover o livro');
        },
      });
    }
  }

  // Método para fechar o carrinho ao clicar fora dele
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
  toggleDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
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
    };

    if (this.filtroSelecionado === 'isbn') {
      filtroAtualizado.isbn = this.termoPesquisa;
    } else if (this.filtroSelecionado === 'titulo') {
      filtroAtualizado.titulo = this.termoPesquisa;
    } else if (this.filtroSelecionado === 'autor') {
      filtroAtualizado.autor = this.termoPesquisa;
    }

    this.livroService.buscarLivrosComFiltros(filtroAtualizado).subscribe(
      (livros) => {
        this.livrosAtualizados.emit(livros); // Emite os livros para o componente pai
        this.termoPesquisa = ''; // Limpa o termo de pesquisa
      },
      (error) => {
        console.error('Erro ao buscar livros', error);
      }
    );
  }
}
