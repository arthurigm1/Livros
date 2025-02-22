export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface ItemPedido {
  tituloLivro: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Pedido {
  id: number;
  status: string;
  valorTotal: string;
  endereco: Endereco;
  itens: ItemPedido[];
}
