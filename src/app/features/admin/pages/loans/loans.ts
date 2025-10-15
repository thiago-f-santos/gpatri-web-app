import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Loan } from '../../../../core/models/loan.model';
import { LoanService } from '../../../../core/services/loan-service';
import { Button } from '../../../../shared/components/button/button';
import { ConfirmationMessage } from '../../../../shared/components/confirmation-message/confirmation-message';
import { ItemDisplay } from '../../../../shared/components/item-display/item-display';
import { SelectInput, SelectOption } from '../../../../shared/components/select-input/select-input';
import { OverdueColorPipe } from './pipes/overdue-color-pipe';
import { ConditionDisplayPipe } from '../../../../shared/pipes/condition-display-pipe';
import { LoanViewModal } from './components/loan-view-modal/loan-view-modal';
import { NotificationService } from '../../../../core/services/notification.service';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { LoanStatus } from '../../../../shared/types/loan-status';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConfirmationMessage,
    SelectInput,
    OverdueColorPipe,
    ItemDisplay,
    Button,
    ItemDisplay,
    ConditionDisplayPipe,
    LoanViewModal,
    Pagination,
  ],
  templateUrl: './loans.html',
  styleUrl: './loans.scss',
})
export class Loans implements OnInit {
  public loans = signal<Loan[]>([]);
  public isLoading = signal(true);
  public selectedFilter = signal<'ALL' | 'APPROVED' | 'RETURNED' | 'OVERDUE' | 'DENIED'>('ALL');

  public currentPage = signal(0);
  public totalPages = signal(0);
  public pageSize = 5;

  public isConfirmationOpen = signal(false);
  public isViewModalOpen = signal(false);
  public selectedLoan = signal<Loan | null>(null);

  private readonly loanService = inject(LoanService);
  private readonly notificationService = inject(NotificationService);

  filterOptions: SelectOption[] = [
    { value: 'ALL', label: 'Todos' },
    { value: 'APPROVED', label: 'Aprovados' },
    { value: 'DENIED', label: 'Negados' },
    { value: 'RETURNED', label: 'Devolvidos' },
    { value: 'OVERDUE', label: 'Atrasados' },
  ];

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.isLoading.set(true);
    const filter = this.selectedFilter();

    let status: LoanStatus | undefined;
    const statusMap: { [key: string]: LoanStatus } = {
      APPROVED: 'APROVADO',
      DENIED: 'NEGADO',
      RETURNED: 'DEVOLVIDO',
      OVERDUE: 'ATRASADO',
    };

    if (filter in statusMap) {
      status = statusMap[filter];
    }

    this.loanService.getLoans(this.currentPage(), this.pageSize, status).subscribe((data) => {
      let loansData = data.content.filter((loan) => loan.situacao !== 'EM_ESPERA');

      this.loans.set(loansData);
      this.totalPages.set(data.page.totalPages);
      this.isLoading.set(false);
    });
  }

  onFilterChange(): void {
    this.currentPage.set(0);
    this.loadLoans();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadLoans();
  }

  onReturnClick(loan: Loan): void {
    this.selectedLoan.set(loan);
    this.isConfirmationOpen.set(true);
  }

  confirmReturn(): void {
    const loanToReturn = this.selectedLoan();
    if (!loanToReturn) return;

    this.loanService.returnLoan(loanToReturn.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Empréstimo devolvido com sucesso!');
        this.loadLoans();
        this.closeModal();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao devolver o empréstimo.');
        console.error(err);
        this.closeModal();
      },
    });
  }

  cancelReturn(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.isConfirmationOpen.set(false);
    this.isViewModalOpen.set(false);
    this.selectedLoan.set(null);
  }

  openViewModal(loan: Loan): void {
    this.selectedLoan.set(loan);
    this.isViewModalOpen.set(true);
  }
}
