import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthModule, OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';



@Component({
  selector: 'app-root',
   standalone: true,  // Tornando o componente standalone
  imports: [RouterOutlet,CommonModule,OAuthModule],
    providers: [],  // Certifique-se de adicionar OAuthService aos providers
  template: `<router-outlet/>`,
  
})
export class AppComponent {
  title = 'Livros';

}
