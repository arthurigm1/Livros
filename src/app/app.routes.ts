import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './LoginAll/login/login.component';
import { ResetPasswordComponent } from './LoginAll/reset-password/reset-password.component';
import { VerificacaouserComponent } from './LoginAll/verificacaouser/verificacaouser.component';
import { HeaderComponent } from './HomeAll/header/header.component';
import { HomeadminComponent } from './AdminAll/homeadmin/homeadmin.component';
import { AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './AdminAll/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'livros', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify', component: VerificacaouserComponent },
  { path: 'admin', component: HomeadminComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
