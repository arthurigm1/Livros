import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './LoginAll/login/login.component';

import { AutorComponent } from './LivroAll/autor/autor.component';

import { ResetPasswordComponent } from './LoginAll/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'livros', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
