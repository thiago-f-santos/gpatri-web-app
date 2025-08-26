import { LoanStatus } from "../../shared/types/loan-status";
import { ItemPatrimony } from "./item-patrimony.model";
import { User } from "./user.model";

export interface Loan {
  id: number;
  status: LoanStatus;
  requester: User;
  loanDate: Date;
  returnDate: Date
  items: ItemPatrimony[];
}