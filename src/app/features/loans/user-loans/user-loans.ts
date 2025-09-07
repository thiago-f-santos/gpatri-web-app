import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Loan } from '../../../core/models/loan.model';
import { AuthService } from '../../../core/services/auth-service';
import { HeaderService } from '../../../core/services/header-service';
import { LoanService } from '../../../core/services/loan-service';
import { NotificationService } from '../../../core/services/notification.service';
import { ConfirmationMessage } from '../../../shared/components/confirmation-message/confirmation-message';
import { LoanDisplay } from '../components/loan-display/loan-display';

@Component({
  selector: 'app-user-loans',
  standalone: true,
  imports: [CommonModule, LoanDisplay, ConfirmationMessage],
  templateUrl: './user-loans.html',
  styleUrl: './user-loans.scss',
})
export class UserLoans implements OnInit {
  loans$!: Observable<Loan[]>;
  isConfirmMessageOpen: boolean = false;
  selectedLoan: Loan | null = null;

  constructor(
    private loanService: LoanService,
    private authService: AuthService,
    private headerService: HeaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
    this.headerService.showBackButton();
  }

  private loadLoans(): void {
    const userId = this.authService.currentUserId;
    if (userId) {
      this.loans$ = this.loanService.getLoansByUserId(userId).pipe(
        catchError(() => {
          this.notificationService.showError('Não foi possível carregar as solicitações.');
          return of([]);
        })
      );
    } else {
      this.notificationService.showError('Não foi possível obter o ID do usuário para navegação.');
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
        this.notificationService.showSuccess('Solicitação deletada com sucesso!');
        this.loadLoans();
        this.closeModal();
      },
      error: (err) => {
        this.notificationService.showError('Ocorreu um erro ao deletar a solicitação. Tente novamente.');
        console.error('Falha ao deletar a solicitação', err);
        this.closeModal();
      },
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
