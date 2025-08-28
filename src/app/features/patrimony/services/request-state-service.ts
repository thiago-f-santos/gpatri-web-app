import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemPatrimony } from '../../../core/models/item-patrimony.model';
import { Patrimony } from '../../../core/models/patrimony.model';

export interface RequestItem {
  item: ItemPatrimony;
  quantity: number;
  tipoControle: 'UNITARIO' | 'ESTOQUE';
}

@Injectable({
  providedIn: 'root'
})
export class RequestStateService {
  private readonly requestItemsSource = new BehaviorSubject<RequestItem[]>([]);
  public readonly requestItems$: Observable<RequestItem[]> = this.requestItemsSource.asObservable();

  constructor() { }

  addItem(item: ItemPatrimony, patrimony: Patrimony): void {
    const currentItems = this.requestItemsSource.getValue();
    if (!currentItems.some(reqItem => reqItem.item.id === item.id)) {
      const newItem: RequestItem = {
        item: item,
        quantity: 1,
        tipoControle: patrimony.tipoControle
      };
      this.requestItemsSource.next([...currentItems, newItem]);
    }
  }

  removeItem(itemToRemove: ItemPatrimony): void {
    const currentItems = this.requestItemsSource.getValue();
    const newItems = currentItems.filter(reqItem => reqItem.item.id !== itemToRemove.id);
    this.requestItemsSource.next(newItems);
  }

  updateItemQuantity(itemToUpdate: ItemPatrimony, newQuantity: number): void {
    const currentItems = this.requestItemsSource.getValue();
    const updatedItems = currentItems.map(reqItem => {
      if (reqItem.item.id === itemToUpdate.id) {
        const quantityMin = Math.max(1, newQuantity);
        const clampedQuantity = Math.min(quantityMin, itemToUpdate.quantidade);
        return { ...reqItem, quantity: clampedQuantity };
      }
      return reqItem;
    });
    this.requestItemsSource.next(updatedItems);
  }
  
  clearItems(): void {
    this.requestItemsSource.next([]);
  }
}
