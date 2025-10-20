import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemLoan } from '../../../../../../core/models/item-loan.model';
import { Loan } from '../../../../../../core/models/loan.model';
import { LoanService } from '../../../../../../core/services/loan-service';
import { Button } from '../../../../../../shared/components/button/button';
import { LoanItemDisplay } from '../loan-item-display/loan-item-display';
import { NotificationService } from '../../../../../../core/services/notification.service';

@Component({
  selector: 'app-loan-details-modal',
  standalone: true,
  imports: [CommonModule, Button, LoanItemDisplay],
  templateUrl: './loan-details-modal.html',
  styleUrl: './loan-details-modal.scss'
})
export class LoanDetailsModal implements OnInit {
  @Input() loan!: Loan;
  @Output() close = new EventEmitter<void>();
  @Output() loanUpdated = new EventEmitter<void>();

  requesterName = '';
  itemsRequested: ItemLoan[] = [];

  constructor(
    private loanService: LoanService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.requesterName = `${this.loan.usuario.nome} ${this.loan.usuario.sobrenome}`;
    this.itemsRequested = this.loan.itensEmprestimo;
  }

  onApprove(): void {
    this.loanService.approveLoan(this.loan.id).subscribe(({
      next: () => {
        this.notificationService.showSuccess('Solicitação aprovada com sucesso!');
        this.loanUpdated.emit();
        this.onClose();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao aprovar a solicitação.');
        console.error(err);
      }
    }));
  }

  onDeny(): void {
    this.loanService.denyLoan(this.loan.id).subscribe(({
      next: () => {
        this.notificationService.showSuccess('Solicitação negada com sucesso!');
        this.loanUpdated.emit();
        this.onClose();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao negar a solicitação.');
        console.error(err);
      }
    }));
  }

  onClose(): void {
    this.close.emit();
  }
}
