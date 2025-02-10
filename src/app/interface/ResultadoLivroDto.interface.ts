// resultado-livro.dto.ts
export interface ResultadoLivroDto {
  id: string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  isbn: string;
  preco: number;
  // Adicione os outros campos conforme necessário
}