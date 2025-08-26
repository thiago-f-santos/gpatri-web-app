import { ItemPatrimony } from "./item-patrimony.model";

export interface Patrimony {
  id: string;
  nome: string;
  descricao?: string;
  precoEstimado: number;
  tipoControle: 'UNITARIO' | 'ESTOQUE';
  idCategoria: string;
  nomeCategoria: string;
  itensPatrimonio: ItemPatrimony[];
}

export type PatrimonyDto = Omit<Patrimony, 'id' | 'nomeCategoria' | 'itensPatrimonio'>;
