import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from "../../../shared/components/button/button";
import { InputComponent } from '../../../shared/components/input/input';
import { AuthService } from '../../../core/services/auth-service';
import { Router, RouterLink  } from '@angular/router';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.loginError = null;
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        senha: this.loginForm.get('password')?.value
      }

      this.authService.login(loginRequest).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.loginError = 'E-mail ou senha inválidos. Tente novamente.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
