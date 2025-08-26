import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Loan } from '../models/loan.model';
import { User } from '../models/user.model';

const mockUsers: User[] = [
  { id: 'uuid-user-1', name: 'Augusto', lastName: 'Cesar', email: 'augusto.cesar@email.com', role: 'Administração' },
  { id: 'uuid-user-2', name: 'Beatriz', lastName: 'Almeida', email: 'beatriz.almeida@email.com', role: 'Desenvolvimento' },
  { id: 'uuid-user-3', name: 'Carlos', lastName: 'Andrade', email: 'carlos.andrade@email.com', role: 'Financeiro' },
  { id: 'uuid-user-4', name: 'Augusto', lastName: 'Silva', email: 'augusto.silva@email.com', role: 'Desenvolvimento' },
];

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private mockLoans: Loan[] = [
    {
      id: 1,
      status: 'approved',
      requester: mockUsers[0], // Augusto Cesar
      loanDate: new Date('2025-08-15T10:00:00.000Z'),
      returnDate: new Date('2025-09-15T10:00:00.000Z'),
      items: [
        { id: 'item-001', name: "Notebook Dell", condition: 'Novo', status: 'borrowed' },
        { id: 'item-002', name: "Mouse Logitech", condition: 'Usado', status: 'borrowed' },
      ]
    },
    {
      id: 2,
      status: 'pending',
      requester: mockUsers[1], // Beatriz Almeida
      loanDate: new Date('2025-08-22T14:30:00.000Z'),
      returnDate: new Date('2025-09-22T14:30:00.000Z'),
      items: [
        { id: 'item-003', name: "Teclado Mecânico", condition: 'Novo', status: 'borrowed' },
      ]
    },
    {
      id: 3,
      status: 'denied',
      requester: mockUsers[2], // Carlos Andrade
      loanDate: new Date('2025-08-20T09:00:00.000Z'),
      returnDate: new Date('2025-08-27T09:00:00.000Z'),
      items: [
        { id: 'item-004', name: "Monitor Ultrawide", condition: 'Danificado', status: 'available' },
      ]
    },
    {
      id: 4,
      status: 'returned',
      requester: mockUsers[3], // Augusto Silva
      loanDate: new Date('2025-07-10T11:00:00.000Z'),
      returnDate: new Date('2025-08-10T11:00:00.000Z'),
      items: [
        { id: 'item-005', name: "Webcam HD", condition: 'Usado', status: 'available' },
      ]
    },
    {
      id: 5,
      status: 'approved',
      requester: mockUsers[1], // Outro empréstimo para Beatriz Almeida
      loanDate: new Date('2025-08-18T16:00:00.000Z'),
      returnDate: new Date('2025-09-01T16:00:00.000Z'),
      items: [
        { id: 'item-006', name: "HD Externo 1TB", condition: 'Novo', status: 'borrowed' },
      ]
    },
  ];

  constructor() { }

  getLoans(): Observable<Loan[]> {
    return of(this.mockLoans);
  }

  getLoansByUserId(userId: string): Observable<Loan[]> {
    const userLoans = this.mockLoans.filter(loan => loan.requester.id === userId);
    console.log(userLoans);
    return of(userLoans).pipe(delay(300));
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
