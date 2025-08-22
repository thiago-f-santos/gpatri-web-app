import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoanDisplay } from '../components/loan-display/loan-display';
import { Observable } from 'rxjs';
import { LoanRequest } from '../../../shared/types/loan-request';
import { LoanService } from '../services/loan-service';
import { ConfirmationMessage } from '../../../shared/components/confirmation-message/confirmation-message';
import { HeaderService } from '../../../core/services/header-service';

@Component({
  selector: 'app-user-loans',
  standalone: true,
  imports: [CommonModule, LoanDisplay, ConfirmationMessage],
  templateUrl: './user-loans.html',
  styleUrl: './user-loans.scss'
})
export class UserLoans implements OnInit{

  loanRequests$!: Observable<LoanRequest[]>;
  isConfirmMessageOpen: boolean = false;
  selectedLoan: LoanRequest | null = null;

  constructor(
    private loanService: LoanService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.loanRequests$ = this.loanService.getLoanRequests();
    this.headerService.showBackButton();
  }

  deleteRequest(loanRequest: LoanRequest): void {
    this.isConfirmMessageOpen = true;
    this.selectedLoan = loanRequest;
  }

  confirmDeletion(): void {
    if (!this.selectedLoan) {
      console.log("Não há empréstimo selecionado para ser deletado.")
      return;
    }

    this.loanService.deleteLoanRequest(this.selectedLoan).subscribe({
      next: () => {
        console.log('Solicitação deletada com sucesso!');
        this.loanRequests$ = this.loanService.getLoanRequests();
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
