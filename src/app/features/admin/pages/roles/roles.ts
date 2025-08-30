import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Role, RoleDto } from '../../../../core/models/role.model';
import { RoleService } from '../../../../core/services/role-service';
import { Button } from '../../../../shared/components/button/button';
import { ConfirmationMessage } from '../../../../shared/components/confirmation-message/confirmation-message';
import { InputComponent } from '../../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../../shared/components/select-input/select-input';
import { ALL_PERMISSIONS } from '../../../../shared/enums/permissions';
import { RoleCard } from './components/role-card/role-card';
import { EditRoleModal } from './components/edit-role-modal/edit-role-modal'; 

@Component({
  selector: 'app-roles',
  standalone: true,
  // Adicionar o EditRoleModal aos imports quando ele for criado
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button, RoleCard, ConfirmationMessage, EditRoleModal],
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
  // isEditModalOpen = false; // Descomentar quando o modal de edição for criado

  private readonly fb = inject(FormBuilder);
  private readonly roleService = inject(RoleService);

  constructor() {
    this.roleForm = this.fb.group({
      nome: ['', Validators.required],
      // 'permissoes' será um FormArray para lidar com múltiplos valores
      permissoes: this.fb.array([], Validators.required)
    });
  }
  
  // Getter para facilitar o acesso ao FormArray no template
  get permissoesFormArray(): FormArray {
    return this.roleForm.get('permissoes') as FormArray;
  }
  
  // Getter que calcula as permissões ainda não selecionadas
  get availablePermissions(): SelectOption[] {
    const selected = this.permissoesFormArray.value;
    return ALL_PERMISSIONS
      .filter(p => !selected.includes(p))
      .map(p => ({ value: p, label: p }));
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

  addPermission(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const permission = select.value;
    if (permission && !this.permissoesFormArray.value.includes(permission)) {
      this.permissoesFormArray.push(new FormControl(permission));
    }
    // Reseta o select para o placeholder
    select.value = '';
  }

  removePermission(index: number): void {
    this.permissoesFormArray.removeAt(index);
  }

  createRole(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    this.roleService.createCargo(this.roleForm.value as RoleDto).subscribe({
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
  }

  onCloseEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedRole = null;
  }
}