import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserDto } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth-service';
import { UserService } from '../../../core/services/user-service';
import { Button } from "../../../shared/components/button/button";
import { InputComponent } from "../../../shared/components/input/input";
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, InputComponent, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  signupForm!: FormGroup;
  signupError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: passwordMatchValidator
    });
  }

  onSubmit(): void {
    this.signupError = null;
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;
      const userDto: UserDto = {
        nome: firstName,
        sobrenome: lastName,
        email: email,
        senha: password
      };

      this.userService.createUser(userDto).subscribe({
        next: () => {
          this.authService.login({ email: email, senha: password }).subscribe({
            next: () => this.router.navigate(['/']),
            error: (loginErr) => {
              console.error('Erro no login automático:', loginErr);
              this.router.navigate(['/login']);
            }
          });
        },
        error: (err) => {
          console.error('Erro no registro:', err);
          this.signupError = 'Não foi possível realizar o cadastro. O e-mail pode já estar em uso.';
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
