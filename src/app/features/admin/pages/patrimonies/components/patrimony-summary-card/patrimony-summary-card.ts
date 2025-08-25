import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../../../../shared/components/button/button';
import { Patrimony } from '../../../../../../core/models/patrimony.model';

@Component({
  selector: 'app-patrimony-summary-card',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './patrimony-summary-card.html',
  styleUrl: './patrimony-summary-card.scss'
})
export class PatrimonySummaryCard {
  @Input() patrimony!: Patrimony;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}
