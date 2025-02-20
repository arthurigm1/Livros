import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro/livro.service';
import { LivroDetalhadoDto } from '../../interface/livro-detalhado.dto';
import { CarrinhoService } from '../../services/livro/carrinho.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AvaliacaoService } from '../../avaliacao.service';
import { AvaliacaoLivro } from '../../interface/AvaliacaoLivro.interface';

@Component({
  selector: 'app-livrosdetalhes',
  standalone: true, // Adiciona suporte para standalone components
  imports: [CommonModule],
  templateUrl: './livrosdetalhes.component.html',
  styleUrl: './livrosdetalhes.component.scss',
})
export class LivrosdetalhesComponent implements OnInit {
  @Input() livroId: number | null = null;
  @Output() voltar = new EventEmitter<void>();
  isLoggedIn$: Observable<boolean>;
  livro!: LivroDetalhadoDto;
  erro: string = '';
  avaliacoes: AvaliacaoLivro[] = [];
  novaAvaliacao: AvaliacaoLivro = { nota: 0, comentario: '' };
  constructor(
    private livroService: LivroService,
    private carrinhoService: CarrinhoService,
    private toastService: ToastrService,
    private authService: AuthService,
    private avaliacaoService: AvaliacaoService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    if (this.livroId) {
      this.livroService.obterDetalhes(this.livroId.toString()).subscribe({
        next: (data) => (this.livro = data),
        error: () => (this.erro = 'Livro não encontrado ou ID inválido'),
      });
    }
    this.carregarAvaliacoes();
  }
  carregarAvaliacoes(): void {
    this.avaliacaoService
      .getAvaliacoes(this.livro.id.toString())
      .subscribe((data) => {
        this.avaliacoes = data;
      });
  }

  voltarParaLista() {
    this.voltar.emit();
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
}
