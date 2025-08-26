import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ItemPatrimony, ItemPatrimonyDto } from '../models/item-patrimony.model';

@Injectable({
  providedIn: 'root'
})
export class ItemPatrimonyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/patrimonios/api/v1/itenspatrimonio`;

  getAllItems(): Observable<ItemPatrimony[]> {
    return this.http.get<ItemPatrimony[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<ItemPatrimony> {
    return this.http.get<ItemPatrimony>(`${this.apiUrl}/${id}`);
  }

  getItemsByPatrimony(filters: { idPatrimonio?: string; nomePatrimonio?: string }): Observable<ItemPatrimony[]> {
    let params = new HttpParams();
    if (filters.idPatrimonio) {
      params = params.set('idPatrimonio', filters.idPatrimonio);
    }
    if (filters.nomePatrimonio) {
      params = params.set('nomePatrimonio', filters.nomePatrimonio);
    }
    return this.http.get<ItemPatrimony[]>(`${this.apiUrl}/patrimonio`, { params });
  }

  getItemsByCategory(categoryName: string): Observable<ItemPatrimony[]> {
    const params = new HttpParams().set('nomeCategoria', categoryName);
    return this.http.get<ItemPatrimony[]>(`${this.apiUrl}/categoria`, { params });
  }

  createItemPatrimony(itemDto: ItemPatrimonyDto): Observable<ItemPatrimony> {
    return this.http.post<ItemPatrimony>(this.apiUrl, itemDto);
  }

  updateItemPatrimony(id: string, itemDto: Partial<ItemPatrimonyDto>): Observable<ItemPatrimony> {
    return this.http.put<ItemPatrimony>(`${this.apiUrl}/${id}`, itemDto);
  }

  deleteItemPatrimony(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }
}
