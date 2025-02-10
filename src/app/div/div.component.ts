import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-div',
  imports: [],
  templateUrl: './div.component.html',
  styleUrl: './div.component.scss'
})
export class DivComponent {
  constructor(public dialog: MatDialog) {}

  abrirLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '400px', // Tamanho do modal
    });
  }
}
