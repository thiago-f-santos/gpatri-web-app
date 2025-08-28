import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemStatus } from '../../types/item-status';

@Component({
  selector: 'app-item-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-display.html',
  styleUrl: './item-display.scss'
})
export class ItemDisplay {

  @Input() mainText!: string;
  @Input() secondaryText?: string;
  @Input() status: ItemStatus | null = null;
  @Input() showDeleteButton: boolean = false;
  @Input() isSelectable: boolean = false;
  @Input() isSelected: boolean = false;

  @Input() availableItems?: number | null = null;
  @Input() requestQuantity?: number | null = null;
  
  @Output() delete = new EventEmitter<void>();

  onDelete(): void {
    this.delete.emit();
  }

}
