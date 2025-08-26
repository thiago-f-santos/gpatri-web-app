export type CondicaoProduto = 'EXCELENTE' | 'BOM' | 'REGULAR' | 'DANIFICADO' | 'EM_MANUTENCAO' | 'INUTILIZAVEL';

export interface ItemPatrimony {
  id: string;
  patrimonioId: string;
  nomePatrimonio: string;
  condicaoProduto: CondicaoProduto;
  condicaoDescricao: string;
  quantidade: number;
}

export type ItemPatrimonyDto = Omit<ItemPatrimony, 'id' | 'nomePatrimonio'>;