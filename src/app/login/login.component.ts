import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{

  email: string = '';
  password: string = '';

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Lógica de login
    this.dialogRef.close();
  }

  openCadastro() {
    // Lógica para abrir o cadastro
    this.dialogRef.close();
  }
}