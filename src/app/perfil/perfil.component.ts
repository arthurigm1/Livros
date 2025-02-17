import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { EnderecoService } from '../endereco.service';
import { Endereco } from '../interface/Endereco.interface';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'], // Corrigi 'styleUrl' para 'styleUrls'
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: '',
  };
  enderecos: Endereco[] = []; // Adicionando a lista de endereços
  editando = false;
  showAlterarSenhaModal = false;
  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';

  novoEndereco: Endereco = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
  };
  showModalNovoEndereco = false; // Controle do modal
  showModalEditEndereco = false; // Controle do modal de edição

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastrService,
    private http: HttpClient,
    private enderecoService: EnderecoService
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarEnderecos();
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

  abrirModalAlterarSenha(): void {
    this.showAlterarSenhaModal = true;
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
    // Chamada correta para pegar os endereços do usuário
    this.enderecoService.carregarEnderecos().subscribe((dados: any) => {
      this.enderecos = dados;
    });
  }

  abrirModalNovoEndereco(): void {
    this.showModalNovoEndereco = true;
  }

  fecharModalNovoEndereco(): void {
    this.showModalNovoEndereco = false;
  }

  buscarCep(): void {
    const cep = this.novoEndereco.cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {
      this.enderecoService.buscarCep(cep).subscribe((dados: any) => {
        if (!dados.erro) {
          this.novoEndereco.logradouro = dados.logradouro;
          this.novoEndereco.localidade = dados.localidade;
          this.novoEndereco.uf = dados.uf;
          this.novoEndereco.bairro = dados.bairro;
        } else {
          alert('CEP não encontrado');
        }
      });
    }
  }

  salvarEndereco(): void {
    this.enderecoService.salvarEndereco(this.novoEndereco).subscribe(() => {
      this.fecharModalNovoEndereco();
      this.carregarEnderecos(); // Atualiza a lista de endereços
    });
  }

  editarEndereco(endereco: Endereco): void {
    this.novoEndereco = { ...endereco }; // Preenche o formulário com os dados do endereço
    this.abrirModalNovoEndereco(); // Reaproveita o modal para edição
  }

  deletarEndereco(id: any): void {
    this.enderecoService.deletarEndereco(id).subscribe({
      next: (response) => {
        this.toastService.success('Livro excluido com Sucesso!');
        this.carregarEnderecos();
      },
      error: (err) => {
        this.toastService.error('Erro interno!');
      },
    });
  }
}
