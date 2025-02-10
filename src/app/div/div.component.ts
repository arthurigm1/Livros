import { Component } from '@angular/core';

@Component({
  selector: 'app-div',
  imports: [],
  templateUrl: './div.component.html',
  styleUrl: './div.component.scss'
})
export class DivComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
