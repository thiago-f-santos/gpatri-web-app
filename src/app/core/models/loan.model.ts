import { LoanStatus } from "../../shared/types/loan-status";
import { ItemPatrimony } from "./item-patrimony.model";

export interface Loan {
  id: number;
  status: LoanStatus;
  requester: string;
  loanDate: Date;
  returnDate: Date
  items: ItemPatrimony[];
}