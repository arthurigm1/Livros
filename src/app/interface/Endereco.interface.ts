export interface Endereco {
  id: string; // Caso o ID seja opcional
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
