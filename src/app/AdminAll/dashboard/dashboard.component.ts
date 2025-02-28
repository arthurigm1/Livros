import { Component, Input, OnInit } from '@angular/core';

import { PedidoService } from '../../services/user/pedido.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GraficosComponent } from '../graficos/graficos.component';
import { LivroadminComponent } from '../livroadmin/livroadmin.component';
import { LivrosComponent } from '../../LivroAll/livro/livro.component';
import { ToastrService } from 'ngx-toastr';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { PedidosadmComponent } from '../pedidosadm/pedidosadm.component';
import { EditoraadminComponent } from '../editoraadmin/editoraadmin.component';
import { AutoradminComponent } from '../autoradmin/autoradmin.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    GraficosComponent,
    LivroadminComponent,
    UsuariosComponent,
    PedidosadmComponent,
    EditoraadminComponent,
    AutoradminComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSidebarOpen: boolean = true;
  @Input() componente: string = 'grafico';
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  isSidebarCollapsed: boolean = false;

  // Função para alternar a sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Função para recolher/expandir a sidebar
  toggleSidebarCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Função para expandir a sidebar ao passar o mouse
  expandSidebar() {
    if (this.isSidebarCollapsed) {
      this.isSidebarCollapsed = false;
    }
  }

  // Função para recolher a sidebar ao retirar o mouse
  collapseSidebar() {
    if (!this.isSidebarCollapsed) {
      this.isSidebarCollapsed = true;
    }
  }

  ngOnInit() {
    // Verifica se o usuário é admin
    if (!this.authService.isAdminAuthenticated()) {
      this.router.navigate(['/admin']);
      return;
    }
  }
  changeComponent(componente: string) {
    this.componente = componente;
  }
  logout(): void {
    this.authService.logoutAdmin();
    this.toastService.info('Logout efetuado com sucesso');
    this.router.navigate(['/admin']);
  }
}
