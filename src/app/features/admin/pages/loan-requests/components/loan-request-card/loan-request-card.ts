import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { Loan } from '../../../../../../core/models/loan.model';

@Component({
  selector: 'app-loan-request-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-request-card.html',
  styleUrl: './loan-request-card.scss'
})
export class LoanRequestCard {
  @Input() request!: Loan;
  @Output() approve = new EventEmitter<void>();
  @Output() deny = new EventEmitter<void>();
  @Output() cardClick = new EventEmitter<void>();

  onApprove(): void {
    this.approve.emit();
  }

  onDeny(): void {
    this.deny.emit();
  }

  onClick(): void {
    this.cardClick.emit();
  }
}
