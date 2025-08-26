import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../../../../shared/components/button/button';
import { LoanItem, LoanItemDisplay } from '../loan-item-display/loan-item-display';
import { Loan } from '../../../../../../core/models/loan.model';
import { LoanService } from '../../../../../../core/services/loan-service';

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
  itemsRequested: LoanItem[] = [];

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.requesterName = this.loan.requester.name;
    this.itemsRequested = this.loan.items.map(item => ({
      name: item.name,
      quantity: 1,
      condition: item.condition
    }));
  }

  onApprove(): void {
    this.loanService.approveLoan(this.loan.id).subscribe(() => {
      this.loanUpdated.emit();
      this.close.emit();
    });
  }

  onDeny(): void {
    this.loanService.denyLoan(this.loan.id).subscribe(() => {
      this.loanUpdated.emit();
      this.close.emit();
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
