import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoanStatus } from '../../shared/types/loan-status';
import { Loan, LoanDto } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/patrimonios/api/v1/emprestimos`;

  getLoans(status?: LoanStatus): Observable<Loan[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('situacaoEmprestimo', status);
    }
    return this.http.get<Loan[]>(this.apiUrl, { params });
  }

  getLoanById(id: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  getLoansByUserId(userId: String): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/user/${userId}`);
  }

  createLoan(loanDto: LoanDto): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loanDto);
  }

  deleteLoan(loanId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${loanId}`);
  }

  approveLoan(loanId: string): Observable<Loan> {
    return this.http.patch<Loan>(`${this.apiUrl}/${loanId}/aprovar`, {});
  }

  denyLoan(loanId: string): Observable<Loan> {
    return this.http.patch<Loan>(`${this.apiUrl}/${loanId}/negar`, {});
  }

  returnLoan(loanId: string): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${loanId}/devolver`, {});
  }
}
