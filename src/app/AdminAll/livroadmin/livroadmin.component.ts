import { Component } from '@angular/core';
import { CadastroLivroDto } from '../../interface/CadastroLivrodto.interface';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { LivroService } from '../../services/livro/livro.service';
import { ResultadoLivroDto } from '../../interface/ResultadoLivroDto.interface';
import { LivrosAdminDto } from '../../interface/LivrosAdminDto.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livroadmin',
  imports: [CommonModule, FormsModule],
  templateUrl: './livroadmin.component.html',
  styleUrl: './livroadmin.component.scss',
})
export class LivroadminComponent {
  todosLivros: LivrosAdminDto[] = [];
  livroSelecionado: any = null;
  modalAberto = false;
  modalEditarAberto = false;
  totalEstoque: number = 0;
  quantidadeLivros: number = 0;
  constructor(
    private livroService: LivroService,
    private toastService: ToastrService
  ) {}
  livro: CadastroLivroDto = {
    isbn: '',
    titulo: '',
    dataPublicacao: '',
    genero: '',
    preco: 0,
    idAutor: '',
    descricao: '',
    idEditora: '',
    img: '',
    estoque: 0,
  };
  ngOnInit(): void {
    this.livroService.buscarLivrosadmin().subscribe(
      (data) => {
        this.todosLivros = data;
        this.atualizarEstatisticas();
      },
      (error) => {
        this.toastService.error('Erro ao carregar livros');
      }
    );
  }

  atualizarEstatisticas() {
    this.quantidadeLivros = this.todosLivros.length;
    this.totalEstoque = this.todosLivros.reduce((total, livro) => {
      return total + Number(livro.estoque || 0);
    }, 0);
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.livro = {
      isbn: '',
      titulo: '',
      dataPublicacao: '',
      genero: '',
      preco: 0,
      idAutor: '',
      descricao: '',
      idEditora: '',
      img: '',
      estoque: 0,
    };
  }
  abrirModalEditar(livro: any) {
    this.livroSelecionado = {
      ...livro,
      idAutor: livro.autor?.idAutor || livro.autor?.id || '',
    };
    this.modalEditarAberto = true;
  }

  fecharModalEditar() {
    this.modalEditarAberto = false;
  }

  cadastrarLivro() {
    this.livroService.cadastrarLivro(this.livro).subscribe(
      (response) => {
        this.toastService.success('Livro cadastrado com sucesso!');
        this.fecharModal();
        this.ngOnInit();
      },
      (error) => {
        this.toastService.error('Erro ao cadastrar livro');
      }
    );
  }
  deletarLivro(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.livroService.deletarlivro(id).subscribe({
          next: (response) => {
            this.toastService.success('Livro deletado com sucesso!');
            this.ngOnInit();
          },
          error: (err) => {
            this.toastService.error('Erro ao deletar livro');
          },
        });
      }
    });
  }

  atualizarLivro() {
    const livroAtualizado = {
      titulo: this.livroSelecionado.titulo,
      isbn: this.livroSelecionado.isbn,
      preco: this.livroSelecionado.preco,
      genero: this.livroSelecionado.genero,
      dataPublicacao: this.livroSelecionado.dataPublicacao,
      idAutor: this.livroSelecionado.idAutor,
      idEditora: this.livroSelecionado.idEditora,
      descricao: this.livroSelecionado.descricao,
      img: this.livroSelecionado.img,
      estoque: this.livroSelecionado.estoque,
    };

    this.livroService
      .atualizarLivro(this.livroSelecionado.id, livroAtualizado)
      .subscribe(
        () => {
          this.toastService.success('Livro atualizado com sucesso!');
          this.fecharModalEditar();
          this.ngOnInit();
        },
        (error) => {
          this.toastService.error('Erro ao atualizar livro');
          console.error(error);
        }
      );
  }
}
