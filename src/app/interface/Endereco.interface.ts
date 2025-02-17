export interface Endereco {
  id?: number; // Caso o ID seja opcional
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
