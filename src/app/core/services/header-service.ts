import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public showBackButtonSubject = new BehaviorSubject<boolean>(false);
  public showBackButton$: Observable<boolean> = this.showBackButtonSubject.asObservable();

  constructor() { }

  public showBackButton(): void {
    this.showBackButtonSubject.next(true);
  }

  public showMenuButton(): void {
    this.showBackButtonSubject.next(false);
  }
}
