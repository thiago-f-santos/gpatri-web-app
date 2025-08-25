import { ItemPatrimony } from "./item-patrimony.model";

export interface Patrimony {
  id: string;
  patrimonyName: string;
  categoryName: string;
  items: ItemPatrimony[];
}

export type PatrimonyDto = Omit<Patrimony, 'id' | 'items'>;