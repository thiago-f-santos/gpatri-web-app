import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../../../../shared/components/select-input/select-input';
import { Button } from '../../../../../../shared/components/button/button';
import { CategoryService } from '../../../../../../core/services/category-service';
import { Category, CategoryDto } from '../../../../../../core/models/category.model';

@Component({
  selector: 'app-edit-category-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button],
  templateUrl: './edit-category-modal.html',
  styleUrl: './edit-category-modal.scss'
})
export class EditCategoryModal implements OnInit {
  @Input() category!: Category;
  @Input() categoryOptions!: SelectOption[];
  @Output() close = new EventEmitter<void>();
  @Output() categoryUpdated = new EventEmitter<void>();

  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService 
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      nome: [this.category.nome, Validators.required],
      idCategoriaMae: [this.category.idCategoriaMae || '']
    });
  }

  onSave(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const categoryDto: Partial<CategoryDto> = {
      nome: this.editForm.value.nome,
      idCategoriaMae: this.editForm.value.idCategoriaMae || null
    };

    this.categoryService.updateCategory(this.category.id, categoryDto).subscribe({
        next: () => {
          alert('Categoria atualizada com sucesso!');
          this.categoryUpdated.emit();
          this.onClose();
        },
        error: (err) => console.error("Erro ao atualizar categoria", err)
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
