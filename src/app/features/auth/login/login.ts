import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { Button } from "../../../shared/components/button/button";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Formulário válido!');
      console.log('Valor do formulário:', this.productForm.value);

      const description = this.productForm.get('productDescription')?.value;
      console.log('Apenas a descrição:', description);
    } else {
      console.log('Formulário inválido.');
    }
  }

}
