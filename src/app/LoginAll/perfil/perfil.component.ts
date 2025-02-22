import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/user/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { EnderecoService } from '../../services/user/endereco.service';
import { Endereco } from '../../interface/Endereco.interface';
import { PedidoService } from '../../services/user/pedido.service';
import { Pedido } from '../../interface/Pedido.interface';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: '',
  };
  enderecos: Endereco[] = [];
  editando = false;
  showAlterarSenhaModal = false;
  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  novoEndereco: Endereco = {
    id: '',
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
  };
  showModalNovoEndereco = false;
  showModalEditarEndereco = false;
  pedidos: Pedido[] = [];
  loading = false;
  modoEdicaoEndereco: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastrService,
    private http: HttpClient,
    private enderecoService: EnderecoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarEnderecos();
    this.carregarPedidos();
  }

  carregarUsuario(): void {
    this.usuarioService.getUsuario().subscribe((user) => {
      this.usuario = user;
    });
  }

  salvarEdicao(): void {
    this.usuarioService.updateUsuario(this.usuario).subscribe({
      next: (response: any) => {
        this.toastService.success('Usuário atualizado!');
        this.editando = false;
        this.carregarUsuario();
      },
      error: (erro) => {
        console.error('Erro na requisição:', erro);
        this.toastService.error('Erro Interno!');
      },
    });
  }
  secaoAtiva: string = 'perfil';
  currentSection: string = 'profile';

  setSection(section: string): void {
    this.currentSection = section;
  }
  selecionarSecao(secao: string) {
    this.secaoAtiva = secao;
  }
  abrirModalAlterarSenha(): void {
    this.showAlterarSenhaModal = true;
  }
  abrirModalEditarEndereco(): void {
    this.showModalEditarEndereco = true;
    this.showModalNovoEndereco = false;
  }

  fecharModalAlterarSenha(): void {
    this.showAlterarSenhaModal = false;
    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
  }

  alterarSenha(): void {
    if (this.novaSenha !== this.confirmarSenha) {
      this.toastService.error('As senhas não coincidem!');
      return;
    }

    const alterarSenhaDTO = {
      senhaAtual: this.senhaAtual,
      novaSenha: this.novaSenha,
    };

    this.usuarioService.alterarSenha(alterarSenhaDTO).subscribe({
      next: (response) => {
        this.toastService.success('Senha atualizada com Sucesso!');
        this.fecharModalAlterarSenha();
      },
      error: (err) => {
        this.toastService.error('Sua senha atual não corresponde.');
      },
    });
  }

  carregarEnderecos(): void {
    this.enderecoService.carregarEnderecos().subscribe((dados: any) => {
      this.enderecos = dados;
    });
  }

  abrirModalNovoEndereco(): void {
    this.showModalNovoEndereco = true;
    this.modoEdicaoEndereco = false;
    this.novoEndereco = {
      id: '',
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
    };
  }

  fecharModalNovoEndereco(): void {
    this.showModalNovoEndereco = false;
  }

  fecharModalEditarEndereco(): void {
    this.showModalEditarEndereco = false;
  }

  buscarCep(): void {
    const cep = this.novoEndereco.cep.replace(/\D/g, '');

    if (cep.length === 8) {
      // Verifica se o CEP tem 8 caracteres
      this.enderecoService.buscarCep(cep).subscribe(
        (dados: any) => {
          if (!dados.erro) {
            this.novoEndereco.logradouro = dados.logradouro;
            this.novoEndereco.localidade = dados.localidade;
            this.novoEndereco.uf = dados.uf;
            this.novoEndereco.bairro = dados.bairro;
          } else {
            this.toastService.info('CEP não encontrado');
          }
        },
        (erro) => {
          this.toastService.error('Erro ao buscar CEP');
        }
      );
    } else {
      this.toastService.error('CEP inválido, deve ter 8 dígitos');
    }
  }

  salvarEndereco(): void {
    if (this.modoEdicaoEndereco) {
      // Editar
      this.enderecoService
        .editarEndereco(this.novoEndereco.id, this.novoEndereco)
        .subscribe(
          () => {
            this.fecharModalNovoEndereco();
            this.carregarEnderecos();
            this.toastService.success('Endereço editado com sucesso!');
            this.fecharModalEditarEndereco();
          },
          (erro) => {
            this.toastService.error(
              'Erro ao editar o endereço. Tente novamente.'
            );
          }
        );
    } else {
      this.enderecoService.salvarEndereco(this.novoEndereco).subscribe(
        () => {
          this.fecharModalNovoEndereco();
          this.carregarEnderecos();
          this.toastService.success('Endereço cadastrado com sucesso!');
          this.fecharModalEditarEndereco();
        },
        (erro) => {
          this.toastService.error(
            'Erro ao cadastrar o endereço. Tente novamente.'
          );
        }
      );
    }
  }

  editarEndereco(endereco: Endereco): void {
    this.modoEdicaoEndereco = true;
    this.novoEndereco = { ...endereco };
    this.abrirModalEditarEndereco();
  }

  deletarEndereco(id: string): void {
    this.enderecoService.deletarEndereco(id).subscribe({
      next: () => {
        this.toastService.success('Endereço excluído com sucesso!');
        this.carregarEnderecos();
      },
      error: () => {
        this.toastService.error('Erro interno!');
      },
    });
  }
  baixarRelatorio(id: number): void {
    this.pedidoService.baixarRelatorio(id).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);

        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_pedido_${id}.pdf`;

        a.click();

        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Erro ao gerar relatório:', error);
      }
    );
  }

  isCepValido(): boolean {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    return cepRegex.test(this.novoEndereco.cep);
  }
  carregarPedidos(): void {
    this.loading = true;
    this.pedidoService.getPedidos().subscribe(
      (data) => {
        this.pedidos = data;
        this.loading = false;
      },
      (error) => {
        this.toastService.error('Erro interno!');
        this.loading = false;
      }
    );
  }
}
