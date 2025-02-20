export interface AutorDto {
  id: string;
  nome: string;
  dataNascimento: string;
  nacionalidade: string;
}

export interface LivroDetalhadoDto {
  id: number;
  isbn: string;
  titulo: string;
  dataPublicacao: string;
  preco: number;
  genero: string;
  descricao: string;
  autor: AutorDto;
  img: string;
}
