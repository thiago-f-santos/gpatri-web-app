import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';
import { Patrimony, PatrimonyDto } from '../models/patrimony.model';

@Injectable({
  providedIn: 'root',
})
export class PatrimonyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/patrimonios/api/v1/patrimonios`;

  getPatrimonies(page: number, size: number): Observable<Page<Patrimony>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Patrimony>>(this.apiUrl, { params });
  }

  getAvailablePatrimonies(page: number, size: number): Observable<Page<Patrimony>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Patrimony>>(`${this.apiUrl}/available`, { params });
  }

  getPatrimonyById(id: string): Observable<Patrimony> {
    return this.http.get<Patrimony>(`${this.apiUrl}/${id}`);
  }

  getPatrimoniesByName(name: string, page: number, size: number): Observable<Page<Patrimony>> {
    const params = new HttpParams().set('nome', name).set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Patrimony>>(this.apiUrl, { params });
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
