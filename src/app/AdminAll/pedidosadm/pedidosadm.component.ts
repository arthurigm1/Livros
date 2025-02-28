import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../services/user/pedido.service';
import { PedidoAdminDto } from '../../interface/PedidoAdmindto';

@Component({
  selector: 'app-pedidosadm',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidosadm.component.html',
  styleUrl: './pedidosadm.component.scss',
})
export class PedidosadmComponent {
  orders: PedidoAdminDto[] = [];
  selectedOrder: PedidoAdminDto | null = null;

  showItemsModal = false;
  showAddressModal = false;

  constructor(private pedidosService: PedidoService) {}

  ngOnInit() {
    this.pedidosService.getallPedidos().subscribe((data) => {
      this.orders = data;
    });
  }

  openItemsModal(order: PedidoAdminDto) {
    this.selectedOrder = order;
    this.showItemsModal = true;
  }

  closeItemsModal() {
    this.showItemsModal = false;
    this.selectedOrder = null;
  }
  baixarelatorio() {
    this.pedidosService.baixarRelatorioPedidos().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Erro ao baixar o relatório:', error);
      }
    );
  }
  openAddressModal(order: PedidoAdminDto) {
    this.selectedOrder = order;
    this.showAddressModal = true;
  }

  closeAddressModal() {
    this.showAddressModal = false;
    this.selectedOrder = null;
  }
}
