import { Component } from '@angular/core';
import { Loan } from '../../../../core/models/loan.model';
import { LoanService } from '../../../../core/services/loan-service';
import { CommonModule } from '@angular/common';
import { LoanRequestCard } from './components/loan-request-card/loan-request-card';
import { map } from 'rxjs';
import { LoanDetailsModal } from './components/loan-details-modal/loan-details-modal';

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

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  loadPendingRequests(): void {
    this.isLoading = true;
    this.loanService.getLoans().pipe(
      map(loans => loans.filter(loan => loan.status === 'pending'))
    ).subscribe(data => {
      this.pendingRequests = data;
      this.isLoading = false;
    });
  }

  handleApproveRequest(request: Loan): void {
    if (confirm('Tem certeza que deseja aprovar esta solicitação?')) {
      this.loanService.approveLoan(request.id).subscribe(() => {
        this.loadPendingRequests();
      });
    }
  }

  handleDenyRequest(request: Loan): void {
    if (confirm('Tem certeza que deseja negar esta solicitação?')) {
      this.loanService.denyLoan(request.id).subscribe(() => {
        this.loadPendingRequests();
      });
    }
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
