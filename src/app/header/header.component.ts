import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { DivComponent } from '../div/div.component';
import { LivrosComponent } from '../livro/livro.component';

@Component({
  selector: 'app-header',
  imports: [DivComponent,LivrosComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isModalOpen = false;
  isCadastro = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  alternarCadastro() {
    this.isCadastro = !this.isCadastro;
  }

  fazerLogin() {
    alert('Login realizado!');
    this.toggleModal();
  }

  fazerCadastro() {
    alert('Cadastro realizado!');
    this.toggleModal();
  }
}

