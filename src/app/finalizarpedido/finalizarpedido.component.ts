import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../usuario.service';
import {
  CarrinhoService,
  LivroCarrinho,
} from '../services/livro/carrinho.service';
import { Endereco } from '../interface/Endereco.interface';
import { EnderecoService } from '../endereco.service';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../pedido.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-finalizarpedido',
  imports: [CommonModule],
  templateUrl: './finalizarpedido.component.html',
  styleUrl: './finalizarpedido.component.scss',
})
export class FinalizarpedidoComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: '',
  };
  itensCarrinho: LivroCarrinho[] = [];
  enderecos: Endereco[] = [];
  qrCodeUrl: any;

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarCarrinho();
    this.carregarEnderecos();
  }
  constructor(
    private usuarioService: UsuarioService,
    private carrinhoService: CarrinhoService,
    private enderecoService: EnderecoService,
    private pedidoService: PedidoService,
    private sanitizer: DomSanitizer
  ) {}

  carregarUsuario(): void {
    this.usuarioService.getUsuario().subscribe((user) => {
      this.usuario = user;
    });
  }

  carregarCarrinho() {
    this.carrinhoService.listarItens().subscribe(
      (itens) => {
        this.itensCarrinho = itens.map((item) => ({
          ...item,
          quantidade: item.quantidade || 1, // Garante um valor padrão'
        }));
      },
      (error) => {
        console.error('Erro ao carregar o carrinho:', error);
      }
    );
  }
  carregarEnderecos(): void {
    // Chamada correta para pegar os endereços do usuário
    this.enderecoService.carregarEnderecos().subscribe((dados: any) => {
      this.enderecos = dados;
    });
  }

  finalizarCompra(): void {
    // Montando o pedido para envio ao serviço
    const pedido = {
      itens: this.itensCarrinho.map((item) => ({
        livro: item.livroId,
        quantidade: item.quantidade,
        preco: item.preco,
      })),
      valorTotal: this.itensCarrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
      ),
    };

    // Enviando o pedido para o serviço e recebendo o QR Code
    this.pedidoService.criarPedido(pedido).subscribe(
      (qrCodeBase64) => {
        console.log('QR Code Base64:', qrCodeBase64);
        this.qrCodeUrl = qrCodeBase64;
      },
      (error) => {
        console.error('Erro ao finalizar o pedido:', error);
      }
    );
  }
}
