import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemLoan } from '../../../../../../core/models/item-loan.model';

export interface LoanItem {
  name: string;
  quantity: number;
  condition: string;
}

@Component({
  selector: 'app-loan-item-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-item-display.html',
  styleUrl: './loan-item-display.scss'
})
export class LoanItemDisplay {
  @Input() item!: ItemLoan; 
}
