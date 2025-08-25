export interface ItemPatrimony {
  id: string;
  name: string;
  condition: string;
  status: 'available' | 'borrowed';
}

export type ItemPatrimonyDto = Omit<ItemPatrimony, 'id' | 'status'>;