import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemDisplay } from '../../../../shared/components/item-display/item-display';
import { LoanStatus } from '../../../../shared/types/loan-status';
import { Loan } from '../../../../core/models/loan.model';
import { ConditionDisplayPipe } from '../../../../shared/pipes/condition-display-pipe';
import { OverdueColorPipe } from '../../../admin/pages/loans/pipes/overdue-color-pipe';

@Component({
  selector: 'app-loan-display',
  standalone: true,
  imports: [CommonModule, ItemDisplay, ConditionDisplayPipe, OverdueColorPipe],
  templateUrl: './loan-display.html',
  styleUrl: './loan-display.scss'
})
export class LoanDisplay {
  @Input() loanRequest!: Loan;
  @Input() showDeleteButton: boolean = false;
  @Output() delete = new EventEmitter<void>;

  statusText: Record<LoanStatus, string> = {
    'EM_ESPERA': 'Pendente',
    'APROVADO': 'Aprovado',
    'NEGADO': 'Negado',
    'DEVOLVIDO': 'Devolvido',
    'ATRASADO': 'Atrasado'
  };

  onDelete(): void {
    this.delete.emit();
  }

}
