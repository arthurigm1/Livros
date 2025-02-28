import { Component } from '@angular/core';
import { PedidoService } from '../../services/user/pedido.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { ToastrService } from 'ngx-toastr';
Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement
);

@Component({
  selector: 'app-graficos',
  imports: [],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss',
})
export class GraficosComponent {
  chart: any = null; // Gráfico de barras
  chartpizza: any = null; // Gráfico de pizza
  isSidebarOpen: boolean = true;

  valorTotal: number = 0;
  valorPago: number = 0;
  valorAguardandoPagamento: number = 0;
  countPago: number = 0;
  countAguardandoPagamento: number = 0;
  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    // Verifica se o usuário é admin
    if (!this.authService.isAdminAuthenticated()) {
      this.router.navigate(['/admin']);
      return;
    }

    // Busca os dados do backend
    this.pedidoService.getResumoPedido().subscribe(
      (response) => {
        // Atualiza os valores com a resposta do backend
        this.valorTotal = response.valorTotal;
        this.valorPago = response.valorPago;
        this.valorAguardandoPagamento = response.valorAguardandoPagamento;
        this.countPago = response.countPago;
        this.countAguardandoPagamento = response.countAguardandoPagamento;

        // Inicializa os gráficos com os dados atualizados
        this.initCharts();
      },
      (error) => {
        this.toastService.error('Erro ao buscar dados do backend', 'Erro');
      }
    );
  }

  initCharts() {
    // Gráfico de Pizza (Status do Pagamento)
    this.chartpizza = new Chart('pie-chart', {
      type: 'pie',
      data: {
        labels: ['Pago', 'Aguardando Pagamento'],
        datasets: [
          {
            label: 'Status do Pagamento',
            backgroundColor: ['#7375a5', '#3e3e53'],
            data: [this.valorPago, this.valorAguardandoPagamento],
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Valor Total: R$ ${this.valorTotal.toFixed(2)}`,
          },
        },
      },
    });

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Pago', 'Aguardando Pagamento'],
        datasets: [
          {
            label: 'Quantidade de Pagamentos',
            data: [this.countPago, this.countAguardandoPagamento],
            borderWidth: 1,
            backgroundColor: ['#7375a5', '#3e3e53'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Contagem de Pagamentos',
          },
        },
      },
    });
  }
}
