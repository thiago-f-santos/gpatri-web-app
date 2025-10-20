import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Loan } from '../../../../../../core/models/loan.model';
import { LoanItemDisplay } from '../../../loan-requests/components/loan-item-display/loan-item-display';

@Component({
  selector: 'app-loan-view-modal',
  standalone: true,
  imports: [CommonModule, LoanItemDisplay],
  templateUrl: './loan-view-modal.html',
  styleUrl: './loan-view-modal.scss'
})
export class LoanViewModal implements OnInit {
  @Input() loan!: Loan;
  @Output() close = new EventEmitter<void>();

  requesterName = '';
  evaluatorName: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.requesterName = `${this.loan.usuario.nome} ${this.loan.usuario.sobrenome}`;
    
    if (this.loan.usuarioAvaliador) {
      const evaluator = this.loan.usuarioAvaliador;
      const action = this.loan.situacao === 'APROVADO' ? 'Aprovado por' : this.loan.situacao === 'NEGADO' ? 'Negado por' : 'Devolvido por';
      this.evaluatorName.push(action);
      this.evaluatorName.push(`${evaluator.nome} ${evaluator.sobrenome}`);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}