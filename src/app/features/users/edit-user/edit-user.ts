import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { UserDto } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth-service';
import { NotificationService } from '../../../core/services/notification.service';
import { RoleService } from '../../../core/services/role-service';
import { UserService } from '../../../core/services/user-service';
import { Button } from '../../../shared/components/button/button';
import { InputComponent } from '../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../shared/components/select-input/select-input';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectInput, Button],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
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
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idCargo: [{ value: '', disabled: true }],
    });

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = params.get('id')!;

          return forkJoin({
            user: this.userService.getUserById(this.userId),
          });
        })
      )
      .subscribe({
        next: ({ user }) => {
          this.originalEmail = user.email;

          this.userForm.setValue({
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            idCargo: user.idCargo || '',
          });

          this.userForm.setValidators([Validators.required]);
          this.userForm.get('email')?.addValidators(Validators.email);

          if (this.canAssignRole) {
            this.roleService
              .getCargos()
              .pipe(map((roles) => roles.map((role) => ({ value: role.id, label: role.nome }))))
              .subscribe({
                next: (options) => {
                  this.roleOptions = options;
                  this.userForm.get('idCargo')?.enable();
                },
                error: (err) => {
                  console.error('Erro ao carregar cargos:', err);
                  this.notificationService.showError('Ocorreu um erro ao carregar os cargos.');
                },
              });
          }
        },
        error: (err) => {
          console.error('Erro ao carregar dados do usuário:', err);
          this.notificationService.showError('Ocorreu um erro ao carregar os dados do usuário.');
          this.router.navigate(['/admin/users']);
        },
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
      email: formValue.email,
    };

    const isCurrentUser = this.userId === this.authService.currentUserId;
    const emailHasChanged = formValue.email !== this.originalEmail;

    const updateObservables: any = {
      userUpdate: this.userService.updateUser(this.userId, userUpdateDto),
    };

    if (this.userForm.get('idCargo')?.enabled) {
      updateObservables.roleUpdate = this.userService.assignRoleToUser(this.userId, {
        idCargo: formValue.idCargo,
      });
    }

    forkJoin(updateObservables).subscribe({
      next: () => {
        this.notificationService.showSuccess('Usuário atualizado com sucesso!');
        if (isCurrentUser && emailHasChanged) {
          this.notificationService.showSuccess(
            'Seu e-mail foi alterado. Por favor, faça login novamente.'
          );
          this.authService.logout();
        } else {
          this.router.navigate(['/users', this.userId]);
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        this.notificationService.showError('Ocorreu um erro ao atualizar o usuário.');
      },
    });
  }

  get canAssignRole(): boolean {
    return this.authService.hasPermission('CARGO_ATRIBUIR');
  }
}
