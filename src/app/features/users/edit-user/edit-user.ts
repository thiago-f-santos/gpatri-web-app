import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { SelectInput, SelectOption } from '../../../shared/components/select-input/select-input';
import { Button } from '../../../shared/components/button/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user-service';
import { filter, Observable, switchMap } from 'rxjs';
import { User } from '../../../core/models/user.model';

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
  
  // Opções para o campo "Cargo" (role)
  roleOptions: SelectOption[] = [
    { value: 'Administração', label: 'Administração' },
    { value: 'Desenvolvimento', label: 'Desenvolvimento' },
    { value: 'Financeiro', label: 'Financeiro' },
    { value: 'Estudante', label: 'Estudante' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.userId = id;
          return this.userService.getUserById(id);
        }
        return new Observable<undefined>();
      }),
      filter(user => !!user)
    ).subscribe(user => {
      if (user) {
        this.userForm.patchValue({
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        });
      }
    });
  }

  onConfirm(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.userId,
        ...this.userForm.value
      };
      
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.router.navigate(['/users', this.userId]);
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

}
