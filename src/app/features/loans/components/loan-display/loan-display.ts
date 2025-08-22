import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemDisplay } from '../../../../shared/components/item-display/item-display';
import { LoanRequest, LoanStatus } from '../../../../shared/types/loan-request';

@Component({
  selector: 'app-loan-display',
  standalone: true,
  imports: [CommonModule, ItemDisplay],
  templateUrl: './loan-display.html',
  styleUrl: './loan-display.scss'
})
export class LoanDisplay {
  @Input() loanRequest!: LoanRequest;
  @Input() showDeleteButton: boolean = false;
  @Output() delete = new EventEmitter<void>;

  statusText: Record<LoanStatus, string> = {
    'pending': 'Pendente',
    'approved': 'Aprovado',
    'denied': 'Negado',
    'returned': 'Devolvido'
  };

  onDelete(): void {
    this.delete.emit();
  }

}
