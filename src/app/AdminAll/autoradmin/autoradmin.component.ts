import { Component } from '@angular/core';
import { AutorService } from '../../services/autores/autor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autoradmin',
  imports: [CommonModule, FormsModule],
  templateUrl: './autoradmin.component.html',
  styleUrl: './autoradmin.component.scss',
})
export class AutoradminComponent {
  autores: any = [];
  mostrarModal: boolean = false;
  mostrarModalEditar: boolean = false;
  novoAutor = {
    id: '',
    nome: '',
    dataNascimento: '',
    nacionalidade: '',
    descricao: '',
    img: '',
  };
  autorEditado = {
    id: '',
    nome: '',
    dataNascimento: '',
    nacionalidade: '',
    descricao: '',
    img: '',
  };
  constructor(
    private autorService: AutorService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarAutores();
  }
  carregarAutores(): void {
    this.autorService.getAutoresAdmin().subscribe(
      (data) => {
        this.autores = data;
      },
      (error) => {
        console.error('Erro ao carregar autores', error);
      }
    );
  }

  editarAutor(autor: any): void {
    console.log('Editar autor', autor);
  }

  excluirAutor(id: string): void {
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
        this.autorService.excluirAutor(id).subscribe(
          () => {
            this.toastService.success('Autor excluído com sucesso!');
            this.carregarAutores();
          },
          (error) => {
            this.toastService.error('Erro ao excluir autor.');
          }
        );
      }
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.novoAutor = {
      id: '',
      nome: '',
      dataNascimento: '',
      nacionalidade: '',
      descricao: '',
      img: '',
    };
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }
  salvarNovoAutor(): void {
    this.autorService.salvarAutor(this.novoAutor).subscribe(
      () => {
        this.toastService.success('Autor salvo com sucesso!');
        this.carregarAutores();
        this.mostrarModal = false;
      },
      (error) => {
        this.toastService.error('Erro ao salvar autor.');
      }
    );
  }
  abrirModalEditar(autor: any): void {
    this.autorEditado = { ...autor };
    this.mostrarModalEditar = true;
  }

  fecharModalEditar(): void {
    this.mostrarModalEditar = false;
  }

  salvarEdicaoAutor(): void {
    this.autorService
      .atualizarAutor(this.autorEditado.id, this.autorEditado)
      .subscribe({
        next: () => {
          this.toastService.success('Autor atualizado com sucesso!');
          this.fecharModalEditar();
          this.carregarAutores();
        },
        error: (err) => {
          this.toastService.error('Erro ao atualizar autor. Tente novamente.');
        },
      });
  }
}
