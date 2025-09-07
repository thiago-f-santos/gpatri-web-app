import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patrimony } from '../../../../../../core/models/patrimony.model';
import { ItemPatrimonyService } from '../../../../../../core/services/item-patrimony-service';
import { Button } from '../../../../../../shared/components/button/button';
import { ConfirmationMessage } from '../../../../../../shared/components/confirmation-message/confirmation-message';
import { InputComponent } from '../../../../../../shared/components/input/input';
import { ItemDisplay } from '../../../../../../shared/components/item-display/item-display';
import { SelectInput, SelectOption } from '../../../../../../shared/components/select-input/select-input';
import { ItemPatrimony, ItemPatrimonyDto } from '../../../../../../core/models/item-patrimony.model';
import { ConditionDisplayPipe } from '../../../../../../shared/pipes/condition-display-pipe';
import { NotificationService } from '../../../../../../core/services/notification.service';

@Component({
  selector: 'app-manage-items-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button, ItemDisplay, ConfirmationMessage, ConditionDisplayPipe],
  templateUrl: './manage-items-modal.html',
  styleUrl: './manage-items-modal.scss'
})
export class ManageItemsModal implements OnInit {
  @Input() patrimony!: Patrimony;
  @Output() close = new EventEmitter<void>();
  @Output() itemsChanged = new EventEmitter<void>();

  itemForm: FormGroup;
  conditions: SelectOption[] = [
    { value: 'EXCELENTE', label: 'Excelente' },
    { value: 'BOM', label: 'Bom' },
    { value: 'REGULAR', label: 'Regular' },
    { value: 'DANIFICADO', label: 'Danificado' },
  ];

  isConfirmationVisible = false;
  itemToDeleteId: string | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly itemPatrimonyService = inject(ItemPatrimonyService);
  private readonly notificationService = inject(NotificationService);

  constructor() {
    this.itemForm = this.fb.group({
      condicaoDescricao: ['', Validators.required], 
      condicaoProduto: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  createItem(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const itemDto: ItemPatrimonyDto = {
      ...this.itemForm.value,
      idPatrimonio: this.patrimony.id
    };

    this.itemPatrimonyService.createItemPatrimony(itemDto)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Item criado com sucesso!');
          this.itemForm.reset({ quantidade: 1 });
          this.itemsChanged.emit();
        },
        error: (err) => {
          this.notificationService.showError('Erro ao criar item.');
          console.error('Erro ao criar item', err);
        }
      });
  }

  deleteItem(itemId: string): void {
    this.itemToDeleteId = itemId;
    this.isConfirmationVisible = true;
  }

  onConfirmDeletion(): void {
    if (!this.itemToDeleteId) return;

    this.itemPatrimonyService.deleteItemPatrimony(this.itemToDeleteId)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Item deletado com sucesso!');
          this.itemsChanged.emit();
        },
        error: (err) => {
          this.notificationService.showError('Falha ao excluir o item.');
          console.error('Falha ao excluir o item.', err);
        },
        complete: () => this.onCancelDeletion()
      });
  }

  onCancelDeletion(): void {
    this.isConfirmationVisible = false;
    this.itemToDeleteId = null;
  }
  
  getItemStatus(item: ItemPatrimony): 'available' | 'borrowed' {
    return item.quantidade > 0 ? 'available' : 'borrowed';
  }

  onClose(): void {
    this.close.emit();
  }
}
