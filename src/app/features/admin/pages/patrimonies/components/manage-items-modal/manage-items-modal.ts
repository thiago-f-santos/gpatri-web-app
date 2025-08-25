import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatrimonyService } from '../../../../../../core/services/patrimony-service';
import { Button } from '../../../../../../shared/components/button/button';
import { InputComponent } from '../../../../../../shared/components/input/input';
import { ItemDisplay } from '../../../../../../shared/components/item-display/item-display';
import { SelectInput, SelectOption } from '../../../../../../shared/components/select-input/select-input';
import { ConfirmationMessage } from '../../../../../../shared/components/confirmation-message/confirmation-message';
import { Patrimony } from '../../../../../../core/models/patrimony.model';

@Component({
  selector: 'app-manage-items-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button, ItemDisplay, ConfirmationMessage],
  templateUrl: './manage-items-modal.html',
  styleUrl: './manage-items-modal.scss'
})
export class ManageItemsModal {
  @Input() patrimony!: Patrimony;
  @Output() close = new EventEmitter<void>();
  @Output() itemsChanged = new EventEmitter<void>();

  itemForm: FormGroup;
  conditions: SelectOption[] = [
    { value: 'Ótima', label: 'Ótima' },
    { value: 'Boa', label: 'Boa' },
    { value: 'Usada', label: 'Usada' },
  ];

  isConfirmationVisible = false;
  itemToDeleteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private patrimonyService: PatrimonyService
  ) {
    this.itemForm = this.fb.group({
      description: ['', Validators.required], 
      condition: ['', Validators.required],
    });
  }

  createItem(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    this.patrimonyService.addItemToPatrimony(this.patrimony.id, this.itemForm.value)
      .subscribe(() => {
        alert('Item criado com sucesso!');
        this.itemForm.reset();
        this.itemsChanged.emit();
      });
  }

  deleteItem(itemId: string): void {
    this.itemToDeleteId = itemId;
    this.isConfirmationVisible = true;
  }

  onConfirmDeletion(): void {
    if (!this.itemToDeleteId) return;

    this.patrimonyService.deleteItemFromPatrimony(this.patrimony.id, this.itemToDeleteId)
      .subscribe(success => {
        if (success) {
          this.itemsChanged.emit();
        } else {
          alert('Falha ao excluir o item.');
        }
        this.itemToDeleteId = null;
      });
  }

  onCancelDeletion(): void {
    this.isConfirmationVisible = false;
    this.itemToDeleteId = null;
  }

  onClose(): void {
    this.close.emit();
  }

}
