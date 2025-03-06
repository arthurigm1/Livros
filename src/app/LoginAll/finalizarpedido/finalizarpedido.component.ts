import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/user/usuario.service';
import {
  CarrinhoService,
  LivroCarrinho,
} from '../../services/livro/carrinho.service';
import { Endereco } from '../../interface/Endereco.interface';
import { EnderecoService } from '../../services/user/endereco.service';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/user/pedido.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finalizarpedido',
  imports: [CommonModule, FormsModule],
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
  selecionadoEnderecoid: string | null = null;
  pixCopiaECola: any;
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
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
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
          quantidade: item.quantidade || 1,
        }));
      },
      (error) => {
        console.error('Erro ao carregar o carrinho:', error);
      }
    );
  }
  carregarEnderecos(): void {
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
    if (!this.selecionadoEnderecoid) {
      this.toastr.warning('Selecione um endereço para entrega.', 'Atenção');
      return;
    }
    this.pedidoService
      .criarPedido(pedido, this.selecionadoEnderecoid)
      .subscribe(
        (response) => {
          if (response.qrCodeUrl && response.pixCopiaECola) {
            this.toastr.success('Pedido finalizado com sucesso!', 'Sucesso');
            
            this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(
              response.qrCodeUrl
            );
            this.pixCopiaECola = response.pixCopiaECola;
          } else {
            this.toastr.error('Erro ao gerar o pagamento.', 'Erro');
          }
        },
        (error) => {
          this.toastr.error('Erro ao finalizar o pedido.', 'Erro');
          console.error('Erro:', error);
        }
      );
  }

  calcularTotal(): number {
    return this.itensCarrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }

  copiarPix(): void {
    navigator.clipboard
      .writeText(this.pixCopiaECola)
      .then(() => {
        this.toastr.success('Código PIX copiado!', 'Sucesso');
      })
      .catch(() => {
        this.toastr.error('Erro ao copiar PIX.', 'Erro');
      });
  }
}
