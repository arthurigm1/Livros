import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselModule,
  ThemeDirective,
} from '@coreui/angular';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;
  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 10000);
    throw new Error('Method not implemented.');
  }
  filtro = {
    isbn: '',
    titulo: '',
    autor: '',
    precoMin: null,
    precoMax: null,
    genero: '',
    anoPublicacao: null,
  };
  slides: any[] = [
    { src: '/assets/banner/teste.jpg', title: 'Banner' },
    { src: '/assets/banner/2.jpg', title: 'Slide 2' },
    { src: '/assets/banner/3.jpg', title: 'Slide 2' },
    { src: '/assets/banner/4.jpg', title: 'Slide 2' },
    { src: '/assets/banner/5.jpg', title: 'Slide 2' },
  ];

  @Output() filtrar = new EventEmitter<any>();

  aplicarFiltro() {
    this.filtrar.emit(this.filtro);
  }

  limparFiltro() {
    this.filtro = {
      isbn: '',
      titulo: '',
      autor: '',
      precoMin: null,
      precoMax: null,
      genero: '',
      anoPublicacao: null,
    };
    this.filtrar.emit(this.filtro);
  }
  activeIndex = 0;
  prevSlide() {
    this.activeIndex =
      this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1;
  }

  nextSlide() {
    this.activeIndex =
      this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1;
  }
}
