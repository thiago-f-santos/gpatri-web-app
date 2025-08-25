import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private mockLoans: Loan[] = [
    {
      id: 1,
      status: 'pending',
      requester: 'Whindersson',
      loanDate: new Date('2025-08-20T03:00:00.000Z'),
      returnDate: new Date('2025-08-20T03:00:00.000Z'),
      items: [
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c16', name: "Teste", condition: 'Condição Item', status: 'borrowed' },
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c17', name: "Teste", condition: 'Condição Item', status: 'borrowed' },
      ]
    },
    {
      id: 2,
      status: 'pending',
      requester: 'Maria',
      loanDate: new Date('2025-08-20T03:00:00.000Z'),
      returnDate: new Date('2025-08-20T03:00:00.000Z'),
      items: [
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c18', name: "Teste", condition: 'Condição Item', status: 'borrowed' },
      ]
    },
    {
      id: 3,
      status: 'approved',
      requester: 'José',
      loanDate: new Date('2025-08-20T03:00:00.000Z'),
      returnDate: new Date('2025-08-20T03:00:00.000Z'),
      items: [
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c20', name: "Teste", condition: 'Condição Item', status: 'available' },
      ]
    },
  ];

  constructor() { }

  getLoans(): Observable<Loan[]> {
    return of(this.mockLoans);
  }

  deleteLoan(Loan: Loan): Observable<boolean> {
    console.log(`Solicitação ${Loan.id} deletada.`);
    this.mockLoans = this.mockLoans.filter(req => req.id !== Loan.id);
    return of(true);
  }

  approveLoan(loanId: number): Observable<boolean> {
    const loan = this.mockLoans.find(req => req.id === loanId);
    if (loan) {
      loan.status = 'approved';
      console.log(`Solicitação ${loanId} aprovada.`);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  denyLoan(loanId: number): Observable<boolean> {
    const loan = this.mockLoans.find(req => req.id === loanId);
    if (loan) {
      loan.status = 'denied';
      console.log(`Solicitação ${loanId} negada.`);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }
}
