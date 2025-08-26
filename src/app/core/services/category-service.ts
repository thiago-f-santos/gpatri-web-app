import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CategoryDto } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/patrimonios/api/v1/categorias`;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  createCategory(categoryDto: CategoryDto): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, categoryDto);
  }

  updateCategory(id: string, categoryDto: Partial<CategoryDto>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, categoryDto);
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }
}