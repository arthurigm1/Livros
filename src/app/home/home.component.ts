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
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselModule,
} from '@coreui/angular';
import carousel from 'flowbite/lib/esm/components/carousel';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { AutorService } from '../services/autores/autor.service';
import { EditoraService } from '../services/editora.service';
import { LivroService } from '../services/livro/livro.service';
import { CarrinhoService } from '../services/livro/carrinho.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
registerSwiperElements();
@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselModule,
    CommonModule,
  ],
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
  @ViewChild('autoresSwiper') autoresSwiper!: ElementRef;
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;
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
    this.carregarAutores();
    this.carregarEditoras();
    this.carregarLivros();
    this.carregarLivroTec();
  }

  carregarLivroTec(): void {
    const filtro = { genero: 'TECNOLOGIA' }; // Definição do filtro apenas com o gênero desejado

    this.livroService.buscarLivrosComFiltros(filtro).subscribe(
      (data) => {
        this.livrotec = data;
      },
      (error) => {
        console.error('Erro ao buscar livros de tecnologia:', error);
      }
    );
  }

  carregarEditoras(): void {
    this.editoraService.getEditora().subscribe((dados) => {
      this.editoras = dados;
    });
  }
  carregarAutores(): void {
    this.autorService.getAutores().subscribe(
      (data) => {
        this.autoresExibidos = data;
      },
      (error) => {
        console.error('Erro ao carregar autores', error);
      }
    );
  }
  carregarLivros(): void {
    this.livroService.buscarLivros().subscribe(
      (data) => {
        this.livros = data;
      },
      (error) => {
        console.error('Erro ao carregar livros', error);
      }
    );
  }
  selecionarLivro(id: number) {
    this.componenteAlterado.emit('detalhesLivro');
    this.livrofiltro.emit(id); // Emite o evento com o livro selecionado
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
