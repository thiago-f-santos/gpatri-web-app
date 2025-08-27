import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, take } from 'rxjs';
import { ItemPatrimony } from '../../../core/models/item-patrimony.model';
import { Patrimony } from '../../../core/models/patrimony.model';
import { HeaderService } from '../../../core/services/header-service';
import { PatrimonyService } from '../../../core/services/patrimony-service';
import { Button } from '../../../shared/components/button/button';
import { ItemDisplay } from '../../../shared/components/item-display/item-display';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { PatrimonyDisplay } from '../components/patrimony-display/patrimony-display';
import { RequestItem, RequestStateService } from '../services/request-state-service';
import { LoanService } from '../../../core/services/loan-service';
import { LoanDto } from '../../../core/models/loan.model';

interface HomepageViewState {
  patrimonies: Patrimony[];
  requestItems: RequestItem[];
  selectedItems: ItemPatrimony[];
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SearchInput, PatrimonyDisplay, ItemDisplay, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit{
  viewState$!: Observable<HomepageViewState>;

  constructor(
    private patrimonyService: PatrimonyService,
    private loanService: LoanService,
    private requestStateService: RequestStateService,
    private headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const patrimonies$ = this.patrimonyService.getAvailablePatrimonies();
    const requestItems$ = this.requestStateService.requestItems$;
    const selectedItems$ = requestItems$.pipe(
      map(requestItems => requestItems.map(reqItem => reqItem.item))
    );

    this.viewState$ = combineLatest({
      patrimonies: patrimonies$,
      requestItems: requestItems$,
      selectedItems: selectedItems$
    });

    this.headerService.showMenuButton();
  }

  selectItem(item: ItemPatrimony, patrimony: Patrimony): void {
    this.requestStateService.addItem(item, patrimony);
  }

  removeItemFromRequest(itemToRemove: ItemPatrimony): void {
    this.requestStateService.removeItem(itemToRemove);
  }

  onQuantityChange(item: ItemPatrimony, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.requestStateService.updateItemQuantity(item.id, quantity);
  }

  confirmRequest(): void {
    this.requestStateService.requestItems$.pipe(take(1)).subscribe(items => {
      if (items.length === 0) return;

      const loanDto: LoanDto = {
        dataEmprestimo: new Date().toISOString(),
        dataDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        itensEmprestimo: items.map(reqItem => ({
          idItemPatrimonio: reqItem.item.id,
          quantidade: reqItem.quantity
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
