import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { register as registerSwiperElements } from 'swiper/element/bundle';

import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { AutorService } from '../../services/autores/autor.service';
import { EditoraService } from '../../services/editora/editora.service';
import { CarrinhoService } from '../../services/livro/carrinho.service';
import { AuthService } from '../../services/auth.service';
import { LivroService } from '../../services/livro/livro.service';
registerSwiperElements();
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  constructor(
    private autorService: AutorService,
    private editoraService: EditoraService,
    private livroService: LivroService,
    private carrinhoService: CarrinhoService,
    private toastService: ToastrService,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  isLoading: boolean = true;
  @ViewChild('autoresSwiper') autoresSwiper!: ElementRef;

  @Output() componenteAlterado: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() livrofiltro: EventEmitter<number> = new EventEmitter<number>();
  autoresExibidos: any[] = [];
  editoras: any[] = [];
  livros: any[] = [];
  livrotec: any[] = [];
  slides: any[] = [
    { src: '/assets/banner/teste.jpg', title: 'Banner' },
    { src: '/assets/banner/2.jpg', title: 'Slide 2' },
    { src: '/assets/banner/3.jpg', title: 'Slide 2' },
    { src: '/assets/banner/4.jpg', title: 'Slide 2' },
    { src: '/assets/banner/5.jpg', title: 'Slide 2' },
  ];
  isLoggedIn$: Observable<boolean>;
  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.isLoading = true;
    forkJoin({
      autores: this.autorService.getAutores(),
      editoras: this.editoraService.getEditora(),
      livros: this.livroService.buscarLivros(),
      livrosTec: this.livroService.buscarLivrosComFiltros({
        genero: 'TECNOLOGIA',
      }),
    }).subscribe({
      next: (data) => {
        this.autoresExibidos = data.autores;
        this.editoras = data.editoras;
        this.livros = data.livros;
        this.livrotec = data.livrosTec;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  selecionarLivro(id: number): void {
    this.componenteAlterado.emit('detalhesLivro');
    this.livrofiltro.emit(id);
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
