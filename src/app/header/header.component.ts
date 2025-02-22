import { Component, Input } from '@angular/core';

import { DivComponent } from '../div/div.component';
import { LivrosComponent } from '../LivroAll/livro/livro.component';
import { AutorComponent } from '../LivroAll/autor/autor.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FavoritosComponent } from '../LivroAll/favoritos/favoritos.component';
import { LivrolistafilterComponent } from '../LivroAll/livrolistafilter/livrolistafilter.component';
import { LivrosdetalhesComponent } from '../LivroAll/livrosdetalhes/livrosdetalhes.component';
import { PerfilComponent } from '../LoginAll/perfil/perfil.component';
import { FinalizarpedidoComponent } from '../LoginAll/finalizarpedido/finalizarpedido.component';
import { EditoraComponent } from '../LivroAll/editora/editora.component';
import { HomeComponent } from '../home/home.component';
import { SobreComponent } from '../sobre/sobre.component';
import { AutordetalhesComponent } from '../autordetalhes/autordetalhes.component';

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
    AutordetalhesComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() componenteAtual: string = 'home';
  @Input() autorid: number = 0;
  livros: any[] = [];
  livro: any[] = [];
  @Input() livrofiltro: number = 0;

  atualizarLivros(livros: any[]) {
    console.log(livros);
    this.livros = livros;
  }

  exibirDetalhes(livroId: number) {
    this.livrofiltro = livroId;
    this.componenteAtual = 'detalhesLivro';
  }
  detalhesautor(autorid: number) {
    this.autorid = autorid;
    this.componenteAtual = 'autordetalhes';
  }
}
