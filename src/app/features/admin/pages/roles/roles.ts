import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, RoleDto } from '../../../../core/models/role.model';
import { RoleService } from '../../../../core/services/role-service';
import { Button } from '../../../../shared/components/button/button';
import { ConfirmationMessage } from '../../../../shared/components/confirmation-message/confirmation-message';
import { InputComponent } from '../../../../shared/components/input/input';
import { Permission, PERMISSION_GROUPS } from '../../../../shared/enums/permissions';
import { ReplaceUnderscorePipe } from '../../../../shared/pipes/replace-underscore-pipe';
import { EditRoleModal } from './components/edit-role-modal/edit-role-modal';
import { RoleCard } from './components/role-card/role-card';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, Button, RoleCard, ConfirmationMessage, EditRoleModal, ReplaceUnderscorePipe],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})
export class Roles implements OnInit {
  roleForm: FormGroup;
  roles: Role[] = [];
  isLoading = false;
  isConfirmationOpen = false;
  selectedRole: Role | null = null;
  isEditModalOpen = false;

  permissionGroups = PERMISSION_GROUPS;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly roleService = inject(RoleService);

  constructor() {
    this.roleForm = this.fb.group({
      nome: ['', Validators.required],
      permissoes: this.fb.array<Permission>([], Validators.required)
    });
  }
  
  get permissoesFormArray(): FormArray<FormControl<Permission>> {
    return this.roleForm.get('permissoes') as FormArray<FormControl<Permission>>;
  }
  
  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.roleService.getCargos().subscribe(data => {
      this.roles = data;
      this.isLoading = false;
    });
  }
  
  onPermissionChange(permission: Permission, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const formArray = this.permissoesFormArray;

    if (isChecked) {
      formArray.push(this.fb.control(permission));
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

  createRole(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    const newRoleDto: RoleDto = {
      nome: this.roleForm.value.nome,
      permissoes: this.permissoesFormArray.value
    };
    this.roleService.createCargo(newRoleDto).subscribe({
      next: () => {
        alert('Cargo criado com sucesso!');
        this.loadRoles();
        this.roleForm.reset();
        this.permissoesFormArray.clear();
      },
      error: (err) => console.error("Erro ao criar cargo", err)
    });
  }

  handleDeleteRequest(role: Role): void {
    this.selectedRole = role;
    this.isConfirmationOpen = true;
  }
  
  confirmDeletion(): void {
    if (!this.selectedRole) return;
    this.roleService.deleteCargo(this.selectedRole.id).subscribe({
      next: () => {
        this.loadRoles();
        this.cancelDeletion();
      },
      error: () => alert('Falha ao deletar cargo.')
    });
  }
  
  cancelDeletion(): void {
    this.isConfirmationOpen = false;
    this.selectedRole = null;
  }
  
  handleEditRequest(role: Role): void {
    this.selectedRole = role;
    this.isEditModalOpen = true;
  }

  handleRoleUpdated(): void {
    this.loadRoles();
    this.onCloseEditModal();
  }

  onCloseEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedRole = null;
  }
}