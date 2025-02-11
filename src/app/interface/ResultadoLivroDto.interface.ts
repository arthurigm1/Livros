export interface ResultadoLivroDto {
  id: string;
  titulo: string;
  isbn: string;
  preco: number;
  dataPublicacao: string;
  autor: {
    id: string;
    nome: string;
    dataNascimento: string;
  };
   favorito?: boolean;  // Adiciona a propriedade como opcional
}