import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-forgot-password-dialog-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password-dialog-component.component.html',
  styleUrl: './forgot-password-dialog-component.component.scss',
})
export class ForgotPasswordDialogComponentComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponentComponent>
  ) {}

  enviar() {
    if (this.forgotPasswordForm.valid) {
      this.dialogRef.close(this.forgotPasswordForm.value.email);
    }
  }

  fechar() {
    this.dialogRef.close();
  }
}
