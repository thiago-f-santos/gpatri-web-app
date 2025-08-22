import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './patrimony-service';

@Injectable({
  providedIn: 'root'
})
export class RequestStateService {
  private readonly requestItemsSource = new BehaviorSubject<Item[]>([]);
  public readonly requestItems$: Observable<Item[]> = this.requestItemsSource.asObservable();

  constructor() { }

  addItem(item: Item): void {
    const currentItems = this.requestItemsSource.getValue();
    if (!currentItems.some(reqItem => reqItem.id === item.id)) {
      this.requestItemsSource.next([...currentItems, item]);
    }
  }

  removeItem(itemToRemove: Item): void {
    const currentItems = this.requestItemsSource.getValue();
    const newItems = currentItems.filter(item => item.id !== itemToRemove.id);
    this.requestItemsSource.next(newItems);
  }

  clearItems(): void {
    this.requestItemsSource.next([]);
  }
}
