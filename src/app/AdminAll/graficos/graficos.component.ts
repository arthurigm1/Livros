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
  chart: any = null;
  chartpizza: any = null;
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
    if (!this.authService.isAdminAuthenticated()) {
      this.router.navigate(['/admin']);
      return;
    }

    this.pedidoService.getResumoPedido().subscribe(
      (response) => {
        this.valorTotal = response.valorTotal;
        this.valorPago = response.valorPago;
        this.valorAguardandoPagamento = response.valorAguardandoPagamento;
        this.countPago = response.countPago;
        this.countAguardandoPagamento = response.countAguardandoPagamento;

        this.initCharts();
      },
      (error) => {
        this.toastService.error('Erro ao buscar dados do backend', 'Erro');
      }
    );
  }

  initCharts() {
    this.chartpizza = new Chart('pie-chart', {
      type: 'pie',
      data: {
        labels: ['Pago', 'Aguardando Pagamento'],
        datasets: [
          {
            label: 'Status do Pagamento',
            backgroundColor: ['#37504d', '#bb3e1f'],
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
        labels: ['QTD Pago', 'QTD Aguardando Pagamento'],
        datasets: [
          {
            label: 'Quantidade de Pagamentos',
            data: [this.countPago, this.countAguardandoPagamento],
            borderWidth: 1,
            backgroundColor: ['#37504d', '#bb3e1f'],
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
