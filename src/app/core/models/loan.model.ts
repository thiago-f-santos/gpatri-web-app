import { LoanStatus } from "../../shared/types/loan-status";
import { ItemLoan } from "./item-loan.model";

export interface Loan {
  id: string;
  idUsuario: string;
  idUsuarioAvaliador?: string;
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