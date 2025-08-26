import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Patrimony, PatrimonyDto } from '../models/patrimony.model';

@Injectable({
  providedIn: 'root'
})
export class PatrimonyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/patrimonios/api/v1/patrimonios`;

  getPatrimonies(): Observable<Patrimony[]> {
    return this.http.get<Patrimony[]>(this.apiUrl);
  }

  getAvailablePatrimonies(): Observable<Patrimony[]> {
    return this.http.get<Patrimony[]>(`${this.apiUrl}/available`);
  }

  getPatrimonyById(id: string): Observable<Patrimony> {
    return this.http.get<Patrimony>(`${this.apiUrl}/${id}`);
  }

  getPatrimoniesByName(name: string): Observable<Patrimony[]> {
    return this.http.get<Patrimony[]>(`${this.apiUrl}?nome=${name}`);
  }

  createPatrimony(patrimonyDto: PatrimonyDto): Observable<Patrimony> {
    return this.http.post<Patrimony>(this.apiUrl, patrimonyDto);
  }

  updatePatrimony(id: string, patrimonyDto: Partial<PatrimonyDto>): Observable<Patrimony> {
    return this.http.put<Patrimony>(`${this.apiUrl}/${id}`, patrimonyDto);
  }

  deletePatrimony(patrimonyId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${patrimonyId}`);
  }
}
