import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { Button } from "../../../shared/components/button/button";
import { InputComponent } from "../../../shared/components/input/input";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, InputComponent],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    if (this.signupForm.valid) {
      console.log('Formulário de cadastro enviado!', this.signupForm.value);
    } else {
      console.log('Formulário de cadastro inválido.');
      this.signupForm.markAllAsTouched();
    }
  }

}
