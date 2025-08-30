import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, RoleDto } from '../../../../../../core/models/role.model';
import { RoleService } from '../../../../../../core/services/role-service';
import { Button } from '../../../../../../shared/components/button/button';
import { InputComponent } from '../../../../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../../../../shared/components/select-input/select-input';
import { ALL_PERMISSIONS } from '../../../../../../shared/enums/permissions';

@Component({
  selector: 'app-edit-role-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button],
  templateUrl: './edit-role-modal.html',
  styleUrl: './edit-role-modal.scss'
})
export class EditRoleModal implements OnInit {
  @Input() role!: Role;
  @Output() close = new EventEmitter<void>();
  @Output() roleUpdated = new EventEmitter<void>();

  editForm!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly roleService = inject(RoleService);

  ngOnInit(): void {
    this.editForm = this.fb.group({
      nome: [this.role.nome, Validators.required],
      permissoes: this.fb.array(
        // Popula o FormArray inicial com as permissões que o cargo já possui
        this.role.permissoes.map(p => new FormControl(p)),
        Validators.required
      )
    });
  }

  get permissoesFormArray(): FormArray {
    return this.editForm.get('permissoes') as FormArray;
  }

  get availablePermissions(): SelectOption[] {
    const selected = this.permissoesFormArray.value;
    return ALL_PERMISSIONS
      .filter(p => !selected.includes(p))
      .map(p => ({ value: p, label: p }));
  }

  addPermission(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const permission = select.value;
    if (permission && !this.permissoesFormArray.value.includes(permission)) {
      this.permissoesFormArray.push(new FormControl(permission));
    }
    select.value = '';
  }

  removePermission(index: number): void {
    this.permissoesFormArray.removeAt(index);
  }

  onSave(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.roleService.updateCargo(this.role.id, this.editForm.value as RoleDto).subscribe({
      next: () => {
        alert('Cargo atualizado com sucesso!');
        this.roleUpdated.emit();
        this.onClose();
      },
      error: (err) => console.error("Erro ao atualizar cargo", err)
    });
  }

  onClose(): void {
    this.close.emit();
  }
}