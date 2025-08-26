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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idCargo: ['', Validators.required]
    });

    this.roleService.getCargos().pipe(
      map(roles => roles.map(role => ({ value: role.id, label: role.nome })))
    ).subscribe(options => {
      this.roleOptions = options;
    });

    this.route.paramMap.pipe(
      tap(params => this.userId = params.get('id')!),
      switchMap(params => this.userService.getUserById(params.get('id')!)),
      filter(user => !!user)
    ).subscribe(user => {
      this.userForm.patchValue({
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        idCargo: user.idCargo
      });
    });
  }

  onConfirm(): void {
    if (this.userForm.valid && this.userId) {
      const formValue = this.userForm.value;

      const userUpdateDto: Partial<UserDto> = {
        nome: formValue.nome,
        sobrenome: formValue.sobrenome,
        email: formValue.email
      };
      
      const cargoUpdateDto = {
        idCargo: formValue.idCargo
      };

      forkJoin({
        userUpdate: this.userService.updateUser(this.userId, userUpdateDto),
        roleUpdate: this.userService.assignRoleToUser(this.userId, cargoUpdateDto)
      }).subscribe({
        next: () => {
          this.router.navigate(['/users', this.userId]);
        },
        error: (err) => {
          console.error('Erro ao atualizar usuário:', err);
        }
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

}
