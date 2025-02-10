import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

interface LoginForm {
  email: FormControl,
  password: FormControl
}
@Component({
  selector: 'app-login',
  providers:[LoginService],
  imports: [ReactiveFormsModule] ,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm!: FormGroup<LoginForm>;


  constructor(public dialogRef: MatDialogRef<LoginComponent>,  private router: Router,
  private loginService: LoginService,  private toastService: ToastrService) {this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })}



  submit(){
  this.loginService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
    next: () => this.toastService.success("Login efetuado com sucesso"),
    error: () => this.toastService.error("Senha ou Email Incorreto!"),
  })
}

  fechar(): void {
    this.dialogRef.close(); // Fecha o popup
  }
}