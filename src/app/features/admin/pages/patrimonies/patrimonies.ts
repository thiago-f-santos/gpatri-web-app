import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { Button } from '../../../../shared/components/button/button';
import { PatrimonyService } from '../../../../core/services/patrimony-service';
import { PatrimonySummaryCard } from './components/patrimony-summary-card/patrimony-summary-card';
import { ConfirmationMessage } from '../../../../shared/components/confirmation-message/confirmation-message';
import { SelectInput, SelectOption } from "../../../../shared/components/select-input/select-input";
import { ManageItemsModal } from './components/manage-items-modal/manage-items-modal';
import { Patrimony, PatrimonyDto } from '../../../../core/models/patrimony.model';
import { CategoryService } from '../../../../core/services/category-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-patrimonies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PatrimonySummaryCard, InputComponent, Button, ConfirmationMessage, SelectInput, ManageItemsModal],
  templateUrl: './patrimonies.html',
  styleUrl: './patrimonies.scss'
})
export class Patrimonies implements OnInit {

  patrimonyForm!: FormGroup;
  categories: SelectOption[] = [];
  patrimonies: Patrimony[] = [];
  isLoading: boolean = false;

  isPatrimonyDeletionConfirmationOpen: boolean = false;
  isManageItemsModalOpen: boolean = false;
  selectedPatrimony: Patrimony | null = null;

  constructor(
    private fb: FormBuilder,
    private patrimonyService: PatrimonyService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.patrimonyForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      tipoControle: ['UNITARIO', Validators.required],
      precoEstimado: [null],
      idCategoria: ['', Validators.required]
    });

    this.loadPatrimonies();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().pipe(
      map(apiCategories => 
        apiCategories.map(cat => ({ value: cat.id, label: cat.nome }))
      )
    ).subscribe(options => this.categories = options);
  }

  loadPatrimonies(): void {
    this.isLoading = true;
    this.patrimonyService.getPatrimonies().subscribe(data => {
      this.patrimonies = data;
      this.isLoading = false;
    });
  }

  createPatrimony(): void {
    if (this.patrimonyForm.invalid) {
      this.patrimonyForm.markAllAsTouched();
      return;
    }
    
    const newPatrimonyData: PatrimonyDto = this.patrimonyForm.value;

    this.patrimonyService.createPatrimony(newPatrimonyData).subscribe({
      next: () => {
        alert('Patrimônio criado com sucesso!');
        this.loadPatrimonies();
        this.patrimonyForm.reset({ tipoControle: 'UNITARIO' });
      },
      error: (err) => console.error('Erro ao criar patrimônio:', err)
    });
  }

  deletePatrimony(patrimony: Patrimony): void {
    this.isPatrimonyDeletionConfirmationOpen = true;
    this.selectedPatrimony = patrimony;
  }

  manageItems(patrimony: Patrimony): void {
    this.selectedPatrimony = patrimony;
    this.isManageItemsModalOpen = true;
  }

  onConfirm(): void {
    if (this.selectedPatrimony) {
      this.patrimonyService.deletePatrimony(this.selectedPatrimony.id).subscribe({
        next: () => this.loadPatrimonies(),
        error: (err) => console.error("Erro ao deletar patrimonio", err),
        complete: () => this.onCancel()
      });
    }
  }

  onCancel(): void {
    this.isManageItemsModalOpen = false;
    this.isPatrimonyDeletionConfirmationOpen = false;
    this.selectedPatrimony = null;
  }

  handleItemsChanged(): void {
    this.loadPatrimonies();
  }
}
