import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() items: Item[] = [];

  @Input() selectedItems: Item[] = [];

  @Output() itemSelected = new EventEmitter<Item>();

  isSelected(item: Item): boolean {
    return this.selectedItems.some(selected => selected.id === item.id);
  }
}
