import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoanDisplay } from '../components/loan-display/loan-display';
import { Observable } from 'rxjs';
import { LoanService } from '../../../core/services/loan-service';
import { ConfirmationMessage } from '../../../shared/components/confirmation-message/confirmation-message';
import { HeaderService } from '../../../core/services/header-service';
import { Loan } from '../../../core/models/loan.model';
import { AuthService } from '../../../core/services/auth-service';

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
    private authService: AuthService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
    this.headerService.showBackButton();
  }
  
  private loadLoans(): void {
    const userId = this.authService.currentUserId;
    if (userId) {
      this.loans$ = this.loanService.getLoansByUserId(userId);
    } else {
      console.error("Não foi possível obter o ID do usuário para navegação.");
    }
  }

  deleteRequest(loan: Loan): void {
    this.isConfirmMessageOpen = true;
    this.selectedLoan = loan;
  }

  confirmDeletion(): void {
    if (!this.selectedLoan) return;

    this.loanService.deleteLoan(this.selectedLoan.id).subscribe({
      next: () => {
        console.log('Solicitação deletada com sucesso!');
        this.loadLoans();
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
