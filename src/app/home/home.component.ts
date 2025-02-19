import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
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
export class HomeComponent implements AfterViewInit {
  constructor() {}
  @ViewChild('autoresSwiper') autoresSwiper!: ElementRef;
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;
  autores = [
    {
      nome: 'Clarice Lispector',
      imagem: 'assets/autores/clarice.jpg',
    },
    {
      nome: 'Carlos Drummond',
      imagem: 'assets/autores/carlos.jpg',
    },
    {
      nome: 'Machado de Assis',
      imagem: 'assets/autores/machado.jpg',
    },
    {
      nome: 'Monteiro Lobato',
      imagem: 'assets/autores/monteiro.jpg',
    },
  ];

  ngAfterViewInit(): void {}
  slides: any[] = [
    { src: '/assets/banner/teste.jpg', title: 'Banner' },
    { src: '/assets/banner/2.jpg', title: 'Slide 2' },
    { src: '/assets/banner/3.jpg', title: 'Slide 2' },
    { src: '/assets/banner/4.jpg', title: 'Slide 2' },
    { src: '/assets/banner/5.jpg', title: 'Slide 2' },
  ];
}
