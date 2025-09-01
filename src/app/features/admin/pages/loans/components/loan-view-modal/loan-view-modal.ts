import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { Loan } from '../../../../../../core/models/loan.model';
import { UserService } from '../../../../../../core/services/user-service';
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

  requesterName = 'Carregando...';
  evaluatorName: string[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const requester$ = this.userService.getUserById(this.loan.idUsuario);
    
    const evaluator$ = this.loan.idUsuarioAvaliador 
      ? this.userService.getUserById(this.loan.idUsuarioAvaliador)
      : of(null);

    forkJoin({ requester: requester$, evaluator: evaluator$ }).subscribe(({ requester, evaluator }) => {
      this.requesterName = `${requester.nome} ${requester.sobrenome}`;
      if (evaluator) {
        const action = this.loan.situacao === 'APROVADO' ? 'Aprovado por' : this.loan.situacao === 'NEGADO' ? 'Negado por' : 'Devolvido por';
        this.evaluatorName.push(action);
        this.evaluatorName.push(`${evaluator.nome} ${evaluator.sobrenome}`);
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
}