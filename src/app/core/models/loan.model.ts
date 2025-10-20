import { LoanStatus } from "../../shared/types/loan-status";
import { ItemLoan } from "./item-loan.model";
import { User } from "./user.model";

export interface Loan {
  id: string;
  usuario: User;
  usuarioAvaliador?: User;
  situacao: LoanStatus;
  dataEmprestimo: string;
  dataDevolucao: string;
  itensEmprestimo: ItemLoan[];
}

export interface LoanDto {
  itensEmprestimo: {
    idItemPatrimonio: string;
    quantidade: number;
  }[];
  dataEmprestimo: string;
  dataDevolucao: string;
}