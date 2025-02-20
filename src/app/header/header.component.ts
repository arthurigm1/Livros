import { Component, Input } from '@angular/core';

import { DivComponent } from '../div/div.component';
import { LivrosComponent } from '../LivroAll/livro/livro.component';
import { AutorComponent } from '../LivroAll/autor/autor.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FavoritosComponent } from '../LivroAll/favoritos/favoritos.component';
import { LivrolistafilterComponent } from '../LivroAll/livrolistafilter/livrolistafilter.component';
import { LivrosdetalhesComponent } from '../LivroAll/livrosdetalhes/livrosdetalhes.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { FinalizarpedidoComponent } from '../finalizarpedido/finalizarpedido.component';
import { EditoraComponent } from '../editora/editora.component';
import { HomeComponent } from '../home/home.component';
import { SobreComponent } from '../sobre/sobre.component';

@Component({
  selector: 'app-header',
  imports: [
    DivComponent,
    LivrosComponent,
    AutorComponent,
    CommonModule,
    FooterComponent,
    FavoritosComponent,
    LivrolistafilterComponent,
    LivrosdetalhesComponent,
    PerfilComponent,
    FinalizarpedidoComponent,
    EditoraComponent,
    HomeComponent,
    SobreComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() componenteAtual: string = 'home'; // Componente inicial
  livros: any[] = []; // Armazenará os livros para serem passados ao app-livrolistafilter

  @Input() livrofiltro: number = 0;
  exibirComponente(componente: string): void {
    this.componenteAtual = componente;
  }
  // Método para atualizar livros
  atualizarLivros(livros: any[]) {
    this.livros = livros; // Atualiza os livros recebidos
  }

  exibirDetalhes(livroId: number) {
    this.livrofiltro = livroId;
    this.componenteAtual = 'detalhesLivro';
  }
}
