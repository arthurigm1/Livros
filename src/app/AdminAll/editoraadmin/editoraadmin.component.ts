import { Component } from '@angular/core';
import { EditoraService } from '../../services/editora/editora.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editoraadmin',
  imports: [CommonModule, FormsModule],
  templateUrl: './editoraadmin.component.html',
  styleUrl: './editoraadmin.component.scss',
})
export class EditoraadminComponent {
  isModalOpen = false;
  novaEditora = { nome: '', img: '' };
  editoras: any = [];
  editoraEmEdicao: any = null;

  constructor(
    private editoraService: EditoraService,
    private toastService: ToastrService
  ) {}
  ngOnInit(): void {
    this.carregarEditoras();
  }
  abrirModal(editora?: any) {
    if (editora) {
      this.editoraEmEdicao = editora;
      this.novaEditora = { ...editora };
    } else {
      this.editoraEmEdicao = null;
      this.novaEditora = { nome: '', img: '' };
    }
    this.isModalOpen = true;
  }

  fecharModal() {
    this.isModalOpen = false;
    this.novaEditora = { nome: '', img: '' };
  }

  carregarEditoras() {
    this.editoraService.getEditoraAdmin().subscribe(
      (data) => {
        this.editoras = data;
      },
      (error) => {
        console.log('Erro ao carregar editoras');
      }
    );
  }
  atualizarEditora() {
    if (!this.novaEditora.nome) {
      this.toastService.error('O nome da editora é obrigatório.');
      return;
    }

    this.editoraService
      .editarEditora(this.editoraEmEdicao.id, this.novaEditora)
      .subscribe(
        (response) => {
          this.toastService.success('Editora atualizada com sucesso!');
          this.fecharModal();
          this.carregarEditoras();
        },
        (error) => {
          this.toastService.error('Erro ao atualizar editora');
        }
      );
  }
  deletarEditora(id: string) {
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
        this.editoraService.deletarEditora(id).subscribe({
          next: () => {
            this.toastService.success('Editora excluída com sucesso!');
            this.carregarEditoras();
          },
          error: () => {
            this.toastService.error('Erro ao excluir editora');
          },
        });
      }
    });
  }

  salvarEditora() {
    if (!this.novaEditora.nome) {
      this.toastService.error('O nome da editora é obrigatório.');
      return;
    }

    if (this.editoraEmEdicao) {
      this.atualizarEditora();
    } else {
      this.editoraService.salvarEditora(this.novaEditora).subscribe(
        () => {
          this.toastService.success('Editora salva com sucesso!');
          this.fecharModal();
          this.carregarEditoras();
        },
        (error) => {
          this.toastService.error('Erro ao salvar editora');
        }
      );
    }
  }
}
