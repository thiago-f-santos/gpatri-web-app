import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Category, CategoryDto } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private mockCategories: Category[] = [
    { id: 'uuid-cat-1', name: 'Equipamentos de TI' },
    { id: 'uuid-cat-2', name: 'Periféricos' },
    { id: 'uuid-cat-3', name: 'Monitores', parentId: 'uuid-cat-1', parentCategoryName: 'Equipamentos de TI' },
    { id: 'uuid-cat-4', name: 'Teclados', parentId: 'uuid-cat-2', parentCategoryName: 'Periféricos' },
  ];

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of([...this.mockCategories]).pipe(delay(300));
  }

  createCategory(categoryDto: CategoryDto): Observable<Category> {
    const parentCategory = this.mockCategories.find(c => c.id === categoryDto.parentId);

    const newCategory: Category = {
      id: `uuid-cat-${Math.random().toString(36).substring(2, 9)}`,
      name: categoryDto.name,
      parentId: categoryDto.parentId,
      parentCategoryName: parentCategory?.name
    };

    this.mockCategories.push(newCategory);
    console.log('Criando categoria (mock):', newCategory);
    return of(newCategory).pipe(delay(300));
  }

  deleteCategory(categoryId: string): Observable<boolean> {
    const initialLength = this.mockCategories.length;
    this.mockCategories = this.mockCategories.filter(c => c.id !== categoryId);
    console.log(`Deletando categoria com ID: ${categoryId}`);
    return of(this.mockCategories.length < initialLength).pipe(delay(300));
  }

  updateCategory(updatedCategory: Category): Observable<Category> {
    const index = this.mockCategories.findIndex(c => c.id === updatedCategory.id);
    if (index === -1) {
      return of(updatedCategory); 
    }

    const parent = this.mockCategories.find(c => c.id === updatedCategory.parentId);
    updatedCategory.parentCategoryName = parent?.name;

    this.mockCategories[index] = updatedCategory;
    console.log('Atualizando categoria (mock):', updatedCategory);
    return of(updatedCategory).pipe(delay(300));
  }
}