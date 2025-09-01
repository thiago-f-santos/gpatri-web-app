import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../shared/components/select-input/select-input';
import { Button } from '../../../shared/components/button/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user-service';
import { filter, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { User, UserDto } from '../../../core/models/user.model';
import { RoleService } from '../../../core/services/role-service';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUser implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  roleOptions: SelectOption[] = [];
  
  private originalEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idCargo: [{value: '', disabled: true}]
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        this.userId = params.get('id')!;
        
        return forkJoin({
          user: this.userService.getUserById(this.userId),
        });
      })
    ).subscribe(({ user }) => {
      
      this.originalEmail = user.email;

      this.userForm.setValue({
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        idCargo: user.idCargo || ''
      });

      this.userForm.setValidators([Validators.required]);
      this.userForm.get('email')?.addValidators(Validators.email);

      if (this.canAssignRole) {
        this.roleService.getCargos().pipe(
          map(roles => roles.map(role => ({ value: role.id, label: role.nome })))
        ).subscribe(options => {
          this.roleOptions = options;
          this.userForm.get('idCargo')?.enable();
        });
      }
    });
  }

  onConfirm(): void {
    if (this.userForm.invalid || !this.userId) {
      this.userForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.userForm.getRawValue();

    const userUpdateDto: Partial<UserDto> = {
      nome: formValue.nome,
      sobrenome: formValue.sobrenome,
      email: formValue.email
    };
    
    const isCurrentUser = this.userId === this.authService.currentUserId;
    const emailHasChanged = formValue.email !== this.originalEmail;
    
    const updateObservables: any = {
      userUpdate: this.userService.updateUser(this.userId, userUpdateDto)
    };

    if (this.userForm.get('idCargo')?.enabled) {
      updateObservables.roleUpdate = this.userService.assignRoleToUser(this.userId, { idCargo: formValue.idCargo });
    }

    forkJoin(updateObservables).subscribe({
      next: () => {
        if (isCurrentUser && emailHasChanged) {
          alert('Seu e-mail foi alterado. Por favor, faça login novamente.');
          this.authService.logout();
        } else {
          this.router.navigate(['/users', this.userId]);
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        alert('Ocorreu um erro ao atualizar o usuário.');
      }
    });
  }
  
  get canAssignRole(): boolean {
    return this.authService.hasPermission('CARGO_ATRIBUIR');
  }
}
