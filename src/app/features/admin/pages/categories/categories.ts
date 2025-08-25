import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category-service';
import { SelectInput, SelectOption } from '../../../../shared/components/select-input/select-input';
import { InputComponent } from '../../../../shared/components/input/input';
import { Button } from '../../../../shared/components/button/button';
import { CategoryCard } from './components/category-card/category-card';
import { ConfirmationMessage } from '../../../../shared/components/confirmation-message/confirmation-message';
import { EditCategoryModal } from './components/edit-category-modal/edit-category-modal';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button, CategoryCard, ConfirmationMessage, EditCategoryModal],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  categoryOptions: SelectOption[] = [];
  isLoading = false;

  isConfirmationOpen = false;
  isEditModalOpen: boolean = false;
  confirmationMessage = '';

  selectedCategory: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parentId: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.categoryOptions = data.map(cat => ({ value: cat.id, label: cat.name }));
      this.isLoading = false;
    });
  }

  createCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const { name, parentId } = this.categoryForm.value;
    this.categoryService.createCategory({ name, parentId }).subscribe(() => {
      alert('Categoria criada com sucesso!');
      this.loadCategories();
      this.categoryForm.reset();
    });
  }

  handleDeleteRequest(category: Category): void {
    this.selectedCategory = category;
    this.confirmationMessage = `Tem certeza que deseja apagar a categoria "${category.name}"?`;
    this.isConfirmationOpen = true;
  }

  confirmDeletion(): void {
    if (!this.selectedCategory) return;
    this.categoryService.deleteCategory(this.selectedCategory.id).subscribe(success => {
      if (success) {
        alert('Categoria deletada com sucesso!');
        this.loadCategories();
      } else {
        alert('Falha ao deletar categoria.');
      }
      this.cancelDeletion();
    });
  }

  cancelDeletion(): void {
    this.isConfirmationOpen = false;
    this.selectedCategory = null;
  }
  
  handleEditRequest(category: Category): void {
    this.isEditModalOpen = true;
    this.selectedCategory = category
  }

  handleCategoryUpdated(): void {
    this.loadCategories();
  }

  onCloseEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedCategory = null;
  }
}