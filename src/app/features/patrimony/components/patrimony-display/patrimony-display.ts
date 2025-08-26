import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemPatrimony } from '../../../../core/models/item-patrimony.model';
import { ItemDisplay } from '../../../../shared/components/item-display/item-display';

export interface Item {
  id: string;
  name: string;
  condition: string;
  status: 'available' | 'borrowed';
}

@Component({
  selector: 'app-patrimony-display',
  standalone: true,
  imports: [CommonModule, ItemDisplay],
  templateUrl: './patrimony-display.html',
  styleUrl: './patrimony-display.scss'
})
export class PatrimonyDisplay {
  @Input() patrimonyName!: string;
  @Input() categoryName!: string;
  @Input() items: ItemPatrimony[] = [];

  @Input() selectedItems: ItemPatrimony[] = [];

  @Output() itemSelected = new EventEmitter<ItemPatrimony>();

  isSelected(item: ItemPatrimony): boolean {
    return this.selectedItems.some(selected => selected.id === item.id);
  }

  getItemStatus(item: ItemPatrimony): 'available' | 'borrowed' {
    return item.quantidade >= 1 ? 'available' : 'borrowed';
  }
}
