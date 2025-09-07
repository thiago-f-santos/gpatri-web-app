import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CategoryDto } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category-service';
import { Button } from '../../../../shared/components/button/button';
import { ConfirmationMessage } from '../../../../shared/components/confirmation-message/confirmation-message';
import { InputComponent } from '../../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../../shared/components/select-input/select-input';
import { CategoryCard } from './components/category-card/category-card';
import { EditCategoryModal } from './components/edit-category-modal/edit-category-modal';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button, CategoryCard, ConfirmationMessage, EditCategoryModal],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {
  categoryForm!: FormGroup;
  categories: Category[] = [];
  categoryOptions: SelectOption[] = [];
  isLoading = false;
  isConfirmationOpen = false;
  isEditModalOpen: boolean = false;
  selectedCategory: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      nome: ['', Validators.required],
      idCategoriaMae: ['']
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.categoryOptions = data.map(cat => ({ value: cat.id, label: cat.nome }));
      this.isLoading = false;
    });
  }

  createCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const categoryDto: CategoryDto = {
      nome: this.categoryForm.value.nome,
      idCategoriaMae: this.categoryForm.value.idCategoriaMae || null
    };

    this.categoryService.createCategory(categoryDto).subscribe({
      next: () => {
        this.notificationService.showSuccess('Categoria criada com sucesso!');
        this.loadCategories();
        this.categoryForm.reset();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao criar categoria.');
        console.error("Erro ao criar categoria", err);
      }
    });
  }

  handleDeleteRequest(category: Category): void {
    this.selectedCategory = category;
    this.isConfirmationOpen = true;
  }
  
  get confirmationMessage(): string {
    return `Tem certeza que deseja apagar a categoria "${this.selectedCategory?.nome}"?`;
  }

  confirmDeletion(): void {
    if (!this.selectedCategory) return;
    
    this.categoryService.deleteCategory(this.selectedCategory.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Categoria deletada com sucesso!');
        this.loadCategories();
        this.cancelDeletion();
      },
      error: (err) => {
        this.notificationService.showError('Falha ao deletar categoria.');
        console.error(err);
        this.cancelDeletion();
      }
    });
  }

  cancelDeletion(): void {
    this.isConfirmationOpen = false;
    this.selectedCategory = null;
  }
  
  handleEditRequest(category: Category): void {
    this.selectedCategory = category
    this.isEditModalOpen = true;
  }

  handleCategoryUpdated(): void {
    this.loadCategories();
  }

  onCloseEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedCategory = null;
  }
}
