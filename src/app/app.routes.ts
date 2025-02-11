import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AutorComponent } from './autor/autor.component';
import { LoginCallbackComponent } from './CALLBACK/callback.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },  // Rota principal
  { path: 'autores', component: AutorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
    { path: 'login/callback', component: LoginCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
