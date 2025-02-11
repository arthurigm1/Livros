import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;  // Usando '!' para indicar que será inicializado

  constructor(private fb: FormBuilder, private router: Router,private dialog: MatDialog,private toastService: ToastrService, private authService: LoginService) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    if (this.cadastroForm.valid) {
      const { nome, email, senha } = this.cadastroForm.value;

      this.authService.signup(nome, email, senha).subscribe({
        next: (response) => {
          // Sucesso no cadastro
          this.toastService.success('Cadastro realizado com sucesso', 'Sucesso');
          this.router.navigate(['/livros']); // Redireciona para os livros
        },
        error: (err) => {
          // Erro ao fazer o cadastro
          this.toastService.error('Ocorreu um erro ao realizar o cadastro', 'Erro');
          console.error(err);
        }
      });
    } else {
      this.toastService.error('Por favor, preencha os campos corretamente', 'Erro');
    }
  }

  fechar(): void {
    this.dialog.closeAll(); // Fecha todos os modais abertos
  }
  // Método para abrir o modal de login
  abrirLogin(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      width: '400px', // Tamanho do modal
    });
  }

}
