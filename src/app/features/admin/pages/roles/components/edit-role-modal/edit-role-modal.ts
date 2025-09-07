import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, RoleDto } from '../../../../../../core/models/role.model';
import { RoleService } from '../../../../../../core/services/role-service';
import { Button } from '../../../../../../shared/components/button/button';
import { InputComponent } from '../../../../../../shared/components/input/input';
import { Permission, PERMISSION_GROUPS } from '../../../../../../shared/enums/permissions';
import { ReplaceUnderscorePipe } from '../../../../../../shared/pipes/replace-underscore-pipe';
import { NotificationService } from '../../../../../../core/services/notification.service';

@Component({
  selector: 'app-edit-role-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, Button, ReplaceUnderscorePipe],
  templateUrl: './edit-role-modal.html',
  styleUrl: './edit-role-modal.scss'
})
export class EditRoleModal implements OnInit {
  @Input() role!: Role;
  @Output() close = new EventEmitter<void>();
  @Output() roleUpdated = new EventEmitter<void>();

  editForm!: FormGroup;
  permissionGroups = PERMISSION_GROUPS;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly roleService = inject(RoleService);
  private readonly notificationService = inject(NotificationService);

  ngOnInit(): void {
    const permissionControls = this.role.permissoes.map((p: Permission) => this.fb.control(p));

    this.editForm = this.fb.group({
      nome: [this.role.nome, Validators.required],
      permissoes: this.fb.array(permissionControls, Validators.required)
    });
  }

  get permissoesFormArray(): FormArray<FormControl<Permission>> {
    return this.editForm.get('permissoes') as FormArray<FormControl<Permission>>;
  }
  
  onPermissionChange(permission: Permission, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const formArray = this.permissoesFormArray;

    if (isChecked) {
      if (!formArray.value.includes(permission)) {
        formArray.push(this.fb.control(permission));
      }
    } else {
      const index = formArray.controls.findIndex(control => control.value === permission);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  isPermissionSelected(permission: Permission): boolean {
    return this.permissoesFormArray.value.includes(permission);
  }

  onSave(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const updatedRoleDto: RoleDto = {
      ...this.editForm.value,
      permissoes: this.permissoesFormArray.value
    };

    this.roleService.updateCargo(this.role.id, updatedRoleDto).subscribe({
      next: () => {
        this.notificationService.showSuccess('Cargo atualizado com sucesso!');
        this.roleUpdated.emit();
        this.onClose();
      },
      error: (err) => {
        this.notificationService.showError('Erro ao atualizar cargo.');
        console.error("Erro ao atualizar cargo", err);
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
