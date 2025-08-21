import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { Button } from "../../../shared/components/button/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulário enviado!', this.loginForm.value);
    } else {
      console.log('Formulário inválido.');
      this.loginForm.markAllAsTouched();
    }
  }

}
