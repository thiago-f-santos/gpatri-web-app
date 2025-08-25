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
import { Patrimony } from '../../../../core/models/patrimony.model';

@Component({
  selector: 'app-patrimonies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PatrimonySummaryCard, InputComponent, Button, ConfirmationMessage, SelectInput, ManageItemsModal],
  templateUrl: './patrimonies.html',
  styleUrl: './patrimonies.scss'
})
export class Patrimonies implements OnInit {

  patrimonyForm: FormGroup;
  categories: SelectOption[] = [
    {value: 'Equipamentos de TI', label: 'Equipamentos de TI'},
    {value: 'Periféricos', label: 'Periféricos'},
    {value: 'Móveis', label: 'Móveis'},
    {value: 'Veículos', label: 'Veículos'}
  ]
  patrimonies: Patrimony[] = [];
  isLoading: boolean = false;

  isPatrimonyDeletionConfirmationOpen: boolean = false;
  selectedPatrimony: Patrimony | null = null;

  isManageItemsModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private patrimonyService: PatrimonyService
  ) {
    this.patrimonyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: ['Unitario', Validators.required],
      estimatedPrice: [null],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPatrimonies();
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

    const formValue = this.patrimonyForm.value;
    const newPatrimonyData = {
      patrimonyName: formValue.name,
      categoryName: formValue.category
    };

    this.patrimonyService.createPatrimony(newPatrimonyData).subscribe(() => {
      alert('Patrimônio criado com sucesso!');
      this.loadPatrimonies();
      this.patrimonyForm.reset({ type: 'Unitario' });
    });
  }

  deletePatrimony(patrimony: Patrimony): void {
    this.isPatrimonyDeletionConfirmationOpen = true;
    this.selectedPatrimony = patrimony;
  }

  manageItems(patrimony: Patrimony): void {
    this.isManageItemsModalOpen = true;
    this.selectedPatrimony = patrimony;
  }

  onConfirm(): void {
    if (this.isPatrimonyDeletionConfirmationOpen) {
      if (this.selectedPatrimony) {
        this.patrimonyService.deletePatrimony(this.selectedPatrimony?.id).subscribe(success => {
          if (success) {
            console.log("patrimonio deletado com sucesso"); 
            this.loadPatrimonies();
          } else {
            console.log("erro ao deletar patrimonio");
          }
        });
      }
      this.isPatrimonyDeletionConfirmationOpen = false;
    }

    if (this.isManageItemsModalOpen) {
      this.isManageItemsModalOpen = false;
    }

    this.selectedPatrimony = null;
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
