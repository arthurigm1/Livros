import { Component } from '@angular/core';
import { User } from '../../interface/User.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioadminService } from '../../services/admin/usuarioadmin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  showModal = false;
  selectedUser: User | null = null;
  users: User[] = [];
  constructor(
    private usuarioService: UsuarioadminService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usuarioService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        this.toastService.error('Erro ao carregar usuários:', error);
      },
    });
  }

  deleteUser(userid: string) {
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
        this.usuarioService.deleteUser(userid).subscribe({
          next: () => {
            this.toastService.success('Usuário excluído com sucesso!');
          },
          error: () => {
            this.toastService.error('Erro ao excluir usuário.');
          },
        });
      }
    });
  }

  saveUser() {}
}
