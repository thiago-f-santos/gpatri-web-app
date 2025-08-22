import { ItemStatus } from "./item-status";

export type LoanStatus = 'pending' | 'approved' | 'denied' | 'returned';

export interface Item {
  id: string;
  condition: string;
  status: ItemStatus;
}

export interface LoanRequest {
  id: number;
  status: LoanStatus;
  items: Item[];
}