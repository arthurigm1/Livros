import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  template: '<p>Processando login...</p>',
})
export class LoginCallbackComponent implements OnInit {
  constructor(private oauthService: OAuthService, private router: Router) {}

  ngOnInit() {
    this.oauthService.tryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
