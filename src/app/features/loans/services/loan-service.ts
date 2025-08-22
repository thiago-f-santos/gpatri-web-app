import { Injectable } from '@angular/core';
import { LoanRequest } from '../../../shared/types/loan-request';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private mockLoanRequests: LoanRequest[] = [
    {
      id: 1,
      status: 'pending',
      items: [
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c16', condition: 'Condição Item', status: 'borrowed' },
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c17', condition: 'Condição Item', status: 'borrowed' },
      ]
    },
    {
      id: 2,
      status: 'approved',
      items: [
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c18', condition: 'Condição Item', status: 'borrowed' },
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c19', condition: 'Condição Item', status: 'borrowed' },
      ]
    },
    {
      id: 3,
      status: 'denied',
      items: [
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c20', condition: 'Condição Item', status: 'available' },
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c21', condition: 'Condição Item', status: 'available' },
      ]
    },
    {
      id: 4,
      status: 'returned',
      items: [
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c22', condition: 'Condição Item', status: 'available' },
        { id: '91fa3269-11f5-4cf3-8aa0-3e9c00d48c23', condition: 'Condição Item', status: 'available' },
      ]
    },
  ];

  constructor() { }

  getLoanRequests(): Observable<LoanRequest[]> {
    return of(this.mockLoanRequests);
  }

  deleteLoanRequest(loanRequest: LoanRequest): Observable<boolean> {
    console.log(`Solicitação ${loanRequest.id} deletada.`);
    this.mockLoanRequests = this.mockLoanRequests.filter(req => req.id !== loanRequest.id);
    return of(true);
  }
}
