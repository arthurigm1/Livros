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
import { LoginComponent } from '../LivroAll/login/login.component';
import { AuthService } from '../services/autores/auth.service';
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
  // Função chamada ao adicionar ou remover item
  adicionarItemCarrinho(item: any): void {
    this.itensCarrinho.push(item);
  }

  // Função para remover item do carrinho
  removerItemCarrinho(index: number): void {
    this.itensCarrinho.splice(index, 1);
    if (this.itensCarrinho.length === 0) {
      this.mostrarCarrinho = false; // Oculta o carrinho quando estiver vazio
    }
  }
  // Método que carrega o carrinho (pode ser adaptado para obter dados reais)
  carregarCarrinho() {
    this.carrinhoService.listarItens().subscribe(
      (itens) => {
        this.itensCarrinho = itens.map((item) => ({
          ...item,
          quantidade: item.quantidade || 1, // Garante um valor padrão
        }));
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
  finalizarCompra() {}

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
  // Método para alterar a quantidade de um item no carrinho
  alterarQuantidade(index: number, valor: number): void {
    if (this.itensCarrinho[index]) {
      this.itensCarrinho[index].quantidade += valor;

      // Remove o item do carrinho se a quantidade for zero ou menos
      if (this.itensCarrinho[index].quantidade <= 0) {
        this.removerItemCarrinho(index);
      }
    }
  }

  adicionarLivroAoCarrinho(livroId: number): void {
    this.carrinhoService.adicionarAoCarrinho(livroId).subscribe({
      next: (response: any) => {
        this.toastService.success('Livro adicionado no Carrinho', '', {
          positionClass: 'toast-top-center', // Centraliza o toast na tela
        });
      },
      error: () => this.toastService.error('Erro Interno!'),
    });
  }
  removerLivro(livroId: number): void {
    this.carrinhoService.removerUmaQuantidade(livroId).subscribe({
      next: (response: any) => {
        this.toastService.success('Livro removido com Sucesso!');
        this.cdr.detectChanges();
      },
      error: () => this.toastService.error('Erro Interno!'),
    });
  }

  toggleDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
  }
  buscar() {
    console.log();
    // Aqui você pode chamar o serviço para realizar a pesquisa no back-end
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
