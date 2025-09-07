import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$: Observable<Notification | null> = this.notificationSubject.asObservable();

  showSuccess(message: string): void {
    this.notificationSubject.next({ message, type: 'success' });
    setTimeout(() => this.clear(), 3000);
  }

  showError(message: string): void {
    this.notificationSubject.next({ message, type: 'error' });
    setTimeout(() => this.clear(), 5000);
  }

  clear(): void {
    this.notificationSubject.next(null);
  }
}
