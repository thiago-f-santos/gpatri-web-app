import { Component } from '@angular/core';
import { Loan } from '../../../../core/models/loan.model';
import { LoanService } from '../../../../core/services/loan-service';
import { CommonModule } from '@angular/common';
import { LoanRequestCard } from './components/loan-request-card/loan-request-card';
import { map } from 'rxjs';
import { LoanDetailsModal } from './components/loan-details-modal/loan-details-modal';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-loan-requests',
  standalone: true,
  imports: [CommonModule, LoanRequestCard, LoanDetailsModal],
  templateUrl: './loan-requests.html',
  styleUrl: './loan-requests.scss'
})
export class LoanRequests {
  pendingRequests: Loan[] = [];
  isLoading = false;

  isModalOpen = false;
  selectedLoan: Loan | null = null;

  constructor(private loanService: LoanService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  loadPendingRequests(): void {
    this.isLoading = true;
    this.loanService.getLoans().pipe(
      map(loans => loans.filter(loan => loan.situacao === 'EM_ESPERA'))
    ).subscribe(data => {
      this.pendingRequests = data;
      this.isLoading = false;
    });
  }

  handleApproveRequest(request: Loan): void {
    this.loanService.approveLoan(request.id).subscribe(({
      next: () => {
        this.notificationService.showSuccess('Solicitação aprovada com sucesso!');
        this.loadPendingRequests();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao aprovar a solicitação.');
        console.error(err);
      }
    }));
  }

  handleDenyRequest(request: Loan): void {
    this.loanService.denyLoan(request.id).subscribe(({
      next: () => {
        this.notificationService.showSuccess('Solicitação negada com sucesso!');
        this.loadPendingRequests();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao negar a solicitação.');
        console.error(err);
      }
    }));
  }

  openDetailsModal(loan: Loan): void {
    this.selectedLoan = loan;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedLoan = null;
  }

  handleLoanUpdated(): void {
    this.loadPendingRequests();
  }
}
