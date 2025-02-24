import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verificacaouser',
  imports: [CommonModule],
  templateUrl: './verificacaouser.component.html',
  styleUrl: './verificacaouser.component.scss',
})
export class VerificacaouserComponent implements OnInit {
  token: string = '';
  verificado: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (this.token) {
        this.verifyUser();
      } else {
        this.verificado = false;
        this.toastService.warning(
          'Nenhum token de verificação encontrado!',
          'Aviso'
        );
      }
    });
  }

  verifyUser(): void {
    this.http
      .get('https://fullstacklivros-production.up.railway.app/verify', {
        params: { token: this.token },
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          if (response === 'verify_success') {
            this.verificado = true;
            this.toastService.success(
              'Conta verificada com sucesso!',
              'Sucesso'
            );
            setTimeout(() => this.router.navigate(['/login']), 2000);
          } else {
            this.verificado = false;
            this.toastService.error('Token de verificação inválido!', 'Erro');
          }
        },
        error: () => {
          this.verificado = false;
          this.toastService.error('Erro ao verificar a conta!', 'Erro');
        },
      });
  }
}
