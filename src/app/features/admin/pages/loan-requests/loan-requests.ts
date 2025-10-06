import { Component, OnInit } from '@angular/core';
import { Loan } from '../../../../core/models/loan.model';
import { LoanService } from '../../../../core/services/loan-service';
import { CommonModule } from '@angular/common';
import { LoanRequestCard } from './components/loan-request-card/loan-request-card';
import { LoanDetailsModal } from './components/loan-details-modal/loan-details-modal';
import { NotificationService } from '../../../../core/services/notification.service';
import { Pagination } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-loan-requests',
  standalone: true,
  imports: [CommonModule, LoanRequestCard, LoanDetailsModal, Pagination],
  templateUrl: './loan-requests.html',
  styleUrl: './loan-requests.scss',
})
export class LoanRequests implements OnInit {
  pendingRequests: Loan[] = [];
  isLoading = false;

  isModalOpen = false;
  selectedLoan: Loan | null = null;

  currentPage = 0;
  totalPages = 0;
  pageSize = 5;

  constructor(private loanService: LoanService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  loadPendingRequests(): void {
    this.isLoading = true;
    this.loanService.getLoans(this.currentPage, this.pageSize, 'EM_ESPERA').subscribe((data) => {
      this.pendingRequests = data.content;
      this.totalPages = data.page.totalPages;
      this.isLoading = false;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPendingRequests();
  }

  handleApproveRequest(request: Loan): void {
    this.loanService.approveLoan(request.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Solicitação aprovada com sucesso!');
        this.loadPendingRequests();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao aprovar a solicitação.');
        console.error(err);
      },
    });
  }

  handleDenyRequest(request: Loan): void {
    this.loanService.denyLoan(request.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Solicitação negada com sucesso!');
        this.loadPendingRequests();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao negar a solicitação.');
        console.error(err);
      },
    });
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
