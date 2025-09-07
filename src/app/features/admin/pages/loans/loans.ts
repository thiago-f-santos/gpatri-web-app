import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Loan } from '../../../../core/models/loan.model';
import { LoanService } from '../../../../core/services/loan-service';
import { Button } from '../../../../shared/components/button/button';
import { ConfirmationMessage } from '../../../../shared/components/confirmation-message/confirmation-message';
import { ItemDisplay } from "../../../../shared/components/item-display/item-display";
import { SelectInput, SelectOption } from '../../../../shared/components/select-input/select-input';
import { OverdueColorPipe } from './pipes/overdue-color-pipe';
import { ConditionDisplayPipe } from '../../../../shared/pipes/condition-display-pipe';
import { LoanViewModal } from './components/loan-view-modal/loan-view-modal';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationMessage, SelectInput, OverdueColorPipe, ItemDisplay, Button, ItemDisplay, ConditionDisplayPipe, LoanViewModal],
  templateUrl: './loans.html',
  styleUrl: './loans.scss'
})
export class Loans implements OnInit {
private allLoans = signal<Loan[]>([]);
  public isLoading = signal(true);
  public selectedFilter = signal<'ALL' | 'APPROVED' | 'RETURNED' | 'OVERDUE' | 'DENIED'>('ALL');

  public isConfirmationOpen = signal(false);
  public isViewModalOpen = signal(false);
  public selectedLoan = signal<Loan | null>(null);

  public filteredLoans = computed(() => {
    const loans = this.allLoans();
    const filter = this.selectedFilter();
    
    if (filter === 'ALL') return loans;
    if (filter === 'APPROVED') return loans.filter(l => l.situacao === 'APROVADO');
    if (filter === 'DENIED') return loans.filter(l => l.situacao === 'NEGADO');
    if (filter === 'RETURNED') return loans.filter(l => l.situacao === 'DEVOLVIDO');
    if (filter === 'OVERDUE') return loans.filter(l => this.isOverdue(l));
    
    return [];
  });

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
    this.loanService.getLoans().subscribe(data => {
      const nonPendingLoans = data.filter(loan => loan.situacao !== 'EM_ESPERA');
      this.allLoans.set(nonPendingLoans);
      this.isLoading.set(false);
    });
  }
  
  isOverdue(loan: Loan): boolean {
    return loan.situacao !== 'DEVOLVIDO' && loan.situacao !== 'NEGADO' && new Date(loan.dataDevolucao) < new Date();
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
      }
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
