import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../../../../shared/components/select-input/select-input';
import { Button } from '../../../../../../shared/components/button/button';
import { CategoryService } from '../../../../../../core/services/category-service';
import { Category } from '../../../../../../core/models/category.model';

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
      name: [this.category.name, Validators.required],
      parentId: [this.category.parentId || '']
    });
  }

  onSave(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const formValue = this.editForm.value;
    const updatedCategory: Category = {
      ...this.category,
      name: formValue.name,
      parentId: formValue.parentId || undefined,
    };

    this.categoryService.updateCategory(updatedCategory).subscribe(() => {
      alert('Categoria atualizada com sucesso!');
      this.categoryUpdated.emit();
      this.onClose();
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
