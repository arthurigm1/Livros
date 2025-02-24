import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verificacaouser',
  imports: [CommonModule],
  templateUrl: './verificacaouser.component.html',
  styleUrl: './verificacaouser.component.scss',
})
export class VerificacaouserComponent {
  verificado: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastrService
  ) {}
  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.http
        .get('https://fullstacklivros-production.up.railway.app/verify', {
          params: { code },
          responseType: 'text',
        })
        .subscribe(
          (response) => {
            if (response === 'verify_success') {
              this.verificado = true;
              this.toastService.success(
                'Conta verificada com sucesso!',
                'Sucesso'
              );
              setTimeout(() => this.router.navigate(['/']), 2000);
            } else {
              this.verificado = false;
              this.toastService.error(
                'Código de verificação inválido.',
                'Erro'
              );
            }
          },
          () => {
            this.verificado = false;
            this.toastService.error('Erro ao verificar a conta.', 'Erro');
          }
        );
    } else {
      this.verificado = false;
      this.toastService.warning(
        'Nenhum código de verificação encontrado.',
        'Atenção'
      );
    }
  }
}
