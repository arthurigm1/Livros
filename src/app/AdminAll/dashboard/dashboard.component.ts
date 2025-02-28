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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSidebarCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  expandSidebar() {
    if (this.isSidebarCollapsed) {
      this.isSidebarCollapsed = false;
    }
  }

  collapseSidebar() {
    if (!this.isSidebarCollapsed) {
      this.isSidebarCollapsed = true;
    }
  }

  ngOnInit() {
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
