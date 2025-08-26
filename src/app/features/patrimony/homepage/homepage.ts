import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ItemPatrimony } from '../../../core/models/item-patrimony.model';
import { Patrimony } from '../../../core/models/patrimony.model';
import { HeaderService } from '../../../core/services/header-service';
import { PatrimonyService } from '../../../core/services/patrimony-service';
import { Button } from '../../../shared/components/button/button';
import { ItemDisplay } from '../../../shared/components/item-display/item-display';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { PatrimonyDisplay } from '../components/patrimony-display/patrimony-display';
import { RequestStateService } from '../services/request-state-service';
import { LoanService } from '../../../core/services/loan-service';
import { LoanDto } from '../../../core/models/loan.model';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SearchInput, PatrimonyDisplay, ItemDisplay, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit{
  patrimonies$!: Observable<Patrimony[]>;
  requestItems$: Observable<ItemPatrimony[]>;

  constructor(
    private patrimonyService: PatrimonyService,
    private loanService: LoanService,
    private requestStateService: RequestStateService,
    private headerService: HeaderService,
    private router: Router
  ) {
    this.requestItems$ = this.requestStateService.requestItems$;
  }

  ngOnInit(): void {
    this.patrimonies$ = this.patrimonyService.getAvailablePatrimonies();
    this.headerService.showMenuButton();
  }

  selectItem(item: ItemPatrimony): void {
    this.requestStateService.addItem(item);
  }

  removeItemFromRequest(item: ItemPatrimony): void {
    this.requestStateService.removeItem(item);
  }

  confirmRequest(): void {
    this.requestItems$.pipe(take(1)).subscribe(items => {
      if (items.length === 0) return;

      const loanDto: LoanDto = {
        dataEmprestimo: new Date().toISOString(),
        dataDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        itensEmprestimo: items.map(item => ({
          idItemPatrimonio: item.id,
          quantidade: 1
        }))
      };

      this.loanService.createLoan(loanDto).subscribe({
        next: () => {
          this.requestStateService.clearItems();
          this.router.navigate(['/emprestimos']);
        },
        error: (err) => console.error('Erro ao criar empréstimo:', err)
      });
    });
  }

  onSearch(query: string): void {
    if (query) {
      this.router.navigate(['/results'], { queryParams: { search: query } });
    }
  }
}
