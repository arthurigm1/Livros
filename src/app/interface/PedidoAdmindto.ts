export interface PedidoAdminDto {
  id: number;
  email: string;
  status: string;
  valorTotal: number;
  dataCadastro: string;
  endereco: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
  };
  itens: {
    tituloLivro: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
  }[];
}
