import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemLoan } from '../../../../../../core/models/item-loan.model';
import { Loan } from '../../../../../../core/models/loan.model';
import { LoanService } from '../../../../../../core/services/loan-service';
import { UserService } from '../../../../../../core/services/user-service';
import { Button } from '../../../../../../shared/components/button/button';
import { LoanItemDisplay } from '../loan-item-display/loan-item-display';

@Component({
  selector: 'app-loan-details-modal',
  standalone: true,
  imports: [CommonModule, Button, LoanItemDisplay],
  templateUrl: './loan-details-modal.html',
  styleUrl: './loan-details-modal.scss'
})
export class LoanDetailsModal {
  @Input() loan!: Loan;
  @Output() close = new EventEmitter<void>();
  @Output() loanUpdated = new EventEmitter<void>();

  requesterName = '';
  itemsRequested: ItemLoan[] = [];

  constructor(
    private loanService: LoanService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.loan.idUsuario).subscribe(user => {
      this.requesterName = `${user.nome} ${user.sobrenome}`;
    });

    this.itemsRequested = this.loan.itensEmprestimo;
  }

  onApprove(): void {
    this.loanService.approveLoan(this.loan.id).subscribe(() => {
      this.loanUpdated.emit();
      this.onClose();
    });
  }

  onDeny(): void {
    this.loanService.denyLoan(this.loan.id).subscribe(() => {
      this.loanUpdated.emit();
      this.onClose();
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
