import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { ResultadoLivroDto } from '../interface/ResultadoLivroDto.interface';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FilterComponent } from '../filter/filter.component';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-livro',
  imports: [CommonModule,FilterComponent],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.scss',
  animations: [
    trigger('fadeInList', [
      transition(':enter', [
        query('div', style({ opacity: 0 }), { optional: true }), // Inicialmente todos os itens ficam invisíveis
        query('div', stagger('300ms', [
          animate('500ms ease-out', style({ opacity: 1 }))
        ]), { optional: true }) // Aparecem um a um com 100ms de intervalo
      ])
    ])
  ]
})
export class LivrosComponent implements OnInit {
  livros: ResultadoLivroDto[] = [];
  isLoggedIn$: Observable<boolean>; // Observável para o estado de login
  constructor(private livroService: LivroService, private authService:AuthService,private toastService: ToastrService,private carrinhoService: CarrinhoService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
   }

  ngOnInit(): void {
    this.livroService.buscarLivros().subscribe((data) => {
      this.livros = data; // Agora 'data' é um array simples de livros
    }, error => {
      console.error('Erro ao carregar livros', error);
    });
  }

adicionarLivroAoCarrinho(livroId: number): void {
  this.carrinhoService.adicionarAoCarrinho(livroId).subscribe({
     next: (response: any) => {
        this.toastService.success("Livro adicionado no Carrinho");
       
      },
      error: () => this.toastService.error("Erro Interno!"),
  });
}
  favoritarLivro(livro: any) {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        livro.favorito = !livro.favorito;
      } else {
        this.toastService.error('Você precisa estar logado para favoritar um livro', 'Atenção', {
          timeOut: 3000,  // Tempo de exibição do toast (em ms)
          positionClass: 'toast-top-right',  // Posição do toast
          progressBar: true,  // Exibe a barra de progresso
        });
      }
    });
  }
}
