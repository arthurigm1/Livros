import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './LoginAll/login/login.component';
import { ResetPasswordComponent } from './LoginAll/reset-password/reset-password.component';
import { VerificacaouserComponent } from './verificacaouser/verificacaouser.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'livros', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify', component: VerificacaouserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
