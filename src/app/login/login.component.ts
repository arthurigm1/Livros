import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

interface LoginForm {
  email: FormControl;
  senha: FormControl;
}

@Component({
  selector: 'app-login',
  providers: [LoginService],
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    private loginService: LoginService,
    private toastService: ToastrService,

  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha).subscribe({
      next: (response: any) => {
        this.authService.login(response.token);
        this.toastService.success("Login efetuado com sucesso");
        this.dialog.closeAll();
        location.reload();
      },
      error: () => this.toastService.error("Senha ou Email Incorreto!"),
    });
  }

  fechar(): void {
    this.dialog.closeAll();
  }

  abrirCadastro() {
    this.dialog.closeAll();
    this.dialog.open(CadastroComponent, { width: '400px' });
  }


}
