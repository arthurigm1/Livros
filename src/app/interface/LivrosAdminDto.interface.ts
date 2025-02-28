export interface LivrosAdminDto {
  id: number;
  titulo: string;
  isbn: string;
  preco: number;
  dataPublicacao: string;
  genero: string;
  autor?: {
    id: string;
  };
  img: string;
  estoque: string;
}
