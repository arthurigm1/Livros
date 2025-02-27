import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homeadmin',
  imports: [CommonModule, FormsModule],
  templateUrl: './homeadmin.component.html',
  styleUrl: './homeadmin.component.scss',
})
export class HomeadminComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  login() {
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);
    this.authService.loginAdmin(this.email, this.senha).subscribe({
      next: (res) => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.toastService.error(
            'Erro ao fazer login. Verifique suas credenciais.'
          );
        }
      },
      error: (err) => {
        this.toastService.error(
          'Erro ao fazer login. Verifique suas credenciais.'
        );
      },
    });
  }
}
