import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro/livro.service';
import { LivroDetalhadoDto } from '../../interface/livro-detalhado.dto';
import { CarrinhoService } from '../../services/livro/carrinho.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AvaliacaoService } from '../../services/livro/avaliacao.service';
import { AvaliacaoLivro } from '../../interface/AvaliacaoLivro.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livrosdetalhes',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  novaAvaliacao: AvaliacaoLivro = {
    nota: 0,
    comentario: '',
  };
  mediaAvaliacoes: number = 0;
  estrelasCheias: number = 0;
  porcentagemEstrelaParcial: number = 0;
  isLoading: boolean = true;
  constructor(
    private livroService: LivroService,
    private carrinhoService: CarrinhoService,
    private toastService: ToastrService,
    private authService: AuthService,
    private avaliacaoService: AvaliacaoService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  mediaNota: number = 0;
  ngOnInit(): void {
    if (this.livroId) {
      this.livroService.obterDetalhes(this.livroId.toString()).subscribe({
        next: (data) => {
          this.livro = data;
          this.isLoading = false;
          this.avaliacaoService.getMediaAvaliacao(this.livro.id).subscribe({
            next: (media) => {
              console.log();
              this.mediaNota = media.mediaNota;
            },
            error: () => {
              this.erro = 'Erro ao obter a média das avaliações';
            },
          });
          this.carregarAvaliacoes();
        },
        error: () => (this.erro = 'Livro não encontrado ou ID inválido'),
      });
    }
  }

  carregarAvaliacoes(): void {
    this.avaliacaoService.getAvaliacoes(this.livro.id).subscribe((data) => {
      this.avaliacoes = data;
    });
  }

  adicionarAvaliacao(): void {
    if (!this.livro || !this.livro.id) {
      this.toastService.error('Erro: Livro não encontrado.');
      return;
    }

    if (this.novaAvaliacao.nota === 0) {
      this.toastService.warning('Por favor, selecione uma nota.');
      return;
    }

    this.avaliacaoService
      .adicionarAvaliacao(this.livro.id.toString(), this.novaAvaliacao)
      .subscribe({
        next: () => {
          this.toastService.success('Avaliação adicionada com sucesso!');
          this.novaAvaliacao = { nota: 0, comentario: '' };
          this.carregarAvaliacoes();
        },
        error: () => this.toastService.error('Faça seu Login!'),
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
