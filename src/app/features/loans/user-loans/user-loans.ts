import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoanDisplay } from '../components/loan-display/loan-display';
import { Observable } from 'rxjs';
import { LoanService } from '../../../core/services/loan-service';
import { ConfirmationMessage } from '../../../shared/components/confirmation-message/confirmation-message';
import { HeaderService } from '../../../core/services/header-service';
import { Loan } from '../../../core/models/loan.model';

@Component({
  selector: 'app-user-loans',
  standalone: true,
  imports: [CommonModule, LoanDisplay, ConfirmationMessage],
  templateUrl: './user-loans.html',
  styleUrl: './user-loans.scss'
})
export class UserLoans implements OnInit{

  loans$!: Observable<Loan[]>;
  isConfirmMessageOpen: boolean = false;
  selectedLoan: Loan | null = null;

  constructor(
    private loanService: LoanService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.loans$ = this.loanService.getLoans();
    this.headerService.showBackButton();
  }

  deleteRequest(Loan: Loan): void {
    this.isConfirmMessageOpen = true;
    this.selectedLoan = Loan;
  }

  confirmDeletion(): void {
    if (!this.selectedLoan) {
      console.log("Não há empréstimo selecionado para ser deletado.")
      return;
    }

    this.loanService.deleteLoan(this.selectedLoan).subscribe({
      next: () => {
        console.log('Solicitação deletada com sucesso!');
        this.loans$ = this.loanService.getLoans();
        this.closeModal();
      },
      error: (err) => {
        console.error('Falha ao deletar a solicitação', err);
        alert('Ocorreu um erro ao deletar a solicitação. Tente novamente.');
        this.closeModal();
      }
    });
  }

  cancelDeletion(): void {
    this.closeModal();
  }

  private closeModal(): void {
    this.isConfirmMessageOpen = false;
    this.selectedLoan = null;
  }
}
