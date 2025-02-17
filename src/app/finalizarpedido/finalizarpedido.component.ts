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
  qrCodeUrl: string = '';

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarCarrinho();
    this.carregarEnderecos();
  }
  constructor(
    private usuarioService: UsuarioService,
    private carrinhoService: CarrinhoService,
    private enderecoService: EnderecoService,
    private pedidoService: PedidoService
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

    this.pedidoService.criarPedido(pedido).subscribe(
      (qrCodeBase64) => {
        this.qrCodeUrl = `data:image/png;base64,${qrCodeBase64}`; // Adiciona o prefixo base64 para imagem
      },
      (error) => {
        console.error('Erro ao finalizar o pedido:', error);
      }
    );
  }
}
