import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/user/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.resetForm = new FormGroup({
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmarSenha: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    // Captura o token da URL
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  submit() {
    if (this.resetForm.value.senha !== this.resetForm.value.confirmarSenha) {
      this.toastService.error('As senhas não coincidem!');
      return;
    }

    this.loginService
      .resetPassword(this.token, this.resetForm.value.senha)
      .subscribe({
        next: (response) => {
          this.toastService.success(response.message); // Agora pega a mensagem do JSON
          this.router.navigate(['']);
        },
        error: (error) => {
          if (error.error && error.error.error) {
            this.toastService.error(error.error.error);
          } else {
            this.toastService.error(
              'Erro ao redefinir a senha. Tente novamente!'
            );
          }
        },
      });
  }
}
