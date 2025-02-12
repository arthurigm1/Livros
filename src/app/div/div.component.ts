import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LivrosComponent } from '../livro/livro.component';
import { CarrinhoService, LivroCarrinho } from '../services/carrinho.service';

@Component({
  selector: 'app-div',
  imports: [CommonModule, LivrosComponent], // Importando o módulo comum e LivrosComponent
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.scss'] // Corrigido para 'styleUrls'
})
export class DivComponent {
  @Output() componenteAlterado: EventEmitter<string> = new EventEmitter<string>(); // Emite a alteração do componente

  isLoggedIn$: Observable<boolean>; // Observável para o estado de login
  mostrarCarrinho = false; // Controle para mostrar ou esconder o carrinho
  itensCarrinho: LivroCarrinho[] = [];
  
  constructor(
    public dialog: MatDialog, 
    private authService: AuthService, 
    private toastService: ToastrService,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private eRef: ElementRef
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$; // Assinando o estado de login do serviço
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
    this.toastService.info("Logout efetuado com sucesso"); // Exibe uma mensagem de sucesso
  }

  // Método que carrega itens fictícios no carrinho
  ngOnInit() {
    this.carregarCarrinho();
  }

  // Método para alternar a visibilidade do carrinho
  toggleCarrinho() {
    this.mostrarCarrinho = !this.mostrarCarrinho;
  }

  // Método que carrega o carrinho (pode ser adaptado para obter dados reais)
carregarCarrinho() {
  this.carrinhoService.listarItens().subscribe(
    (itens) => {
      this.itensCarrinho = itens.map(item => ({
        ...item,
        quantidade: item.quantidade || 1 // Garante um valor padrão
      }));
    },
    (error) => {
      console.error('Erro ao carregar o carrinho:', error);
    }
  );
}

  get totalCarrinho(): number {
  return this.itensCarrinho.reduce((total, item) => total + item.preco * (item.quantidade || 1), 0);
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

}
