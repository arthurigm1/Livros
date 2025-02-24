import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pegando o código da URL
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      // Chamando o backend para verificar o código
      this.http
        .get(
          `https://fullstacklivros-production.up.railway.app/verify?code=${code}`,
          {
            responseType: 'text',
          }
        )
        .subscribe(
          (response) => {
            this.verificado = response === 'verify_success';
            this.router.navigate(['/']);
          },
          () => {
            this.verificado = false;
          }
        );
    } else {
      this.verificado = false;
    }
  }
}
