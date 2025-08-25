import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemPatrimony } from '../../../core/models/item-patrimony.model';

@Injectable({
  providedIn: 'root'
})
export class RequestStateService {
  private readonly requestItemsSource = new BehaviorSubject<ItemPatrimony[]>([]);
  public readonly requestItems$: Observable<ItemPatrimony[]> = this.requestItemsSource.asObservable();

  constructor() { }

  addItem(item: ItemPatrimony): void {
    const currentItems = this.requestItemsSource.getValue();
    if (!currentItems.some(reqItem => reqItem.id === item.id)) {
      this.requestItemsSource.next([...currentItems, item]);
    }
  }

  removeItem(itemToRemove: ItemPatrimony): void {
    const currentItems = this.requestItemsSource.getValue();
    const newItems = currentItems.filter(item => item.id !== itemToRemove.id);
    this.requestItemsSource.next(newItems);
  }

  clearItems(): void {
    this.requestItemsSource.next([]);
  }
}
