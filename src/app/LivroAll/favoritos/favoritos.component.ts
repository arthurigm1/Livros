import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FavoritoService } from '../../services/livro/favorito.service';
import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
  animations: [
    trigger('fadeInList', [
      transition(':enter', [
        query('.livro-item', style({ opacity: 0 }), { optional: true }), // Inicia com todos os itens invisíveis
        query(
          '.livro-item',
          stagger('500ms', [animate('1000ms ease-out', style({ opacity: 1 }))]),
          { optional: true }
        ), // Aparecem com intervalo de 500ms
      ]),
    ]),
  ],
})
export class FavoritosComponent {
  livrosFavoritos: ResultadoLivroDto[] = []; // Lista de livros favoritos
  loading: boolean = true; // Variável para controlar o estado de carregamento
  errorMessage: string = ''; // Variável para armazenar mensagens de erro

  constructor(
    private favoritoService: FavoritoService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    // Carregar os livros favoritos ao inicializar o componente
    this.carregarLivrosFavoritos();
  }

  // Função para carregar livros favoritos
  carregarLivrosFavoritos(): void {
    this.favoritoService.obterLivrosFavoritos().subscribe(
      (data) => {
        this.livrosFavoritos = data || []; // Garante que seja um array válido
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao buscar livros favoritos:', error);
        this.errorMessage = 'Erro ao carregar seus favoritos.';
        this.loading = false;
      }
    );
  }
  removerfavorito(livro: any) {
    this.favoritoService.desfavoritarLivro(livro.id).subscribe({
      next: (response) => {
        livro.favorito = false;
        this.toastService.success('Livro desfavoritado com sucesso!');
        this.atualizarFavoritosNoLocalStorage();
        this.carregarLivrosFavoritos();
      },
      error: (error) => {
        this.toastService.error('Erro ao desfavoritar o livro');
      },
    });
  }
  atualizarFavoritosNoLocalStorage() {
    const favoritos = this.livrosFavoritos
      .filter((livro) => livro.favorito)
      .map((livro) => livro.id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
}
