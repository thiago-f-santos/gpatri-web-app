export interface Category {
  id: string;
  nome: string;
  idCategoriaMae?: string;
  categoriaMaeNome?: string;
}

export type CategoryDto = Omit<Category, 'id' | 'categoriaMaeNome'>;