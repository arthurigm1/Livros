import { Component, Input } from '@angular/core';

import { DivComponent } from '../div/div.component';
import { LivrosComponent } from '../livro/livro.component';
import { AutorComponent } from '../autor/autor.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FavoritosComponent } from '../favoritos/favoritos.component';

@Component({
  selector: 'app-header',
  imports: [DivComponent,LivrosComponent,AutorComponent,CommonModule,FooterComponent,FavoritosComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   @Input() componenteAtual: string = 'livros';  // Componente inicial
 
  exibirComponente(componente: string): void {
    this.componenteAtual = componente;
  }

  
}

