import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, switchMap, take } from 'rxjs';
import { ItemPatrimony } from '../../../core/models/item-patrimony.model';
import { Patrimony } from '../../../core/models/patrimony.model';
import { HeaderService } from '../../../core/services/header-service';
import { PatrimonyService } from '../../../core/services/patrimony-service';
import { Button } from '../../../shared/components/button/button';
import { ItemDisplay } from '../../../shared/components/item-display/item-display';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { PatrimonyDisplay } from '../components/patrimony-display/patrimony-display';
import { RequestItem, RequestStateService } from '../services/request-state-service';
import { LoanDto } from '../../../core/models/loan.model';
import { LoanService } from '../../../core/services/loan-service';

interface SearchResultsViewState {
  requestItems: RequestItem[];
  selectedItems: ItemPatrimony[];
  patrimonies: Patrimony[];
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, PatrimonyDisplay, ItemDisplay, SearchInput, Button],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults implements OnInit{
  viewState$!: Observable<SearchResultsViewState>;
  searchQuery: string = '';

  previousSearch: string = '';

  constructor(
    private patrimonyService: PatrimonyService,
    private requestStateService: RequestStateService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private loanService: LoanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const patrimonies$ = this.activatedRoute.queryParamMap.pipe(
      switchMap(params => {
        this.previousSearch = params.get('search') || '';
        return this.patrimonyService.getPatrimoniesByName(this.previousSearch);
      })
    );
    const requestItems$ = this.requestStateService.requestItems$;
    const selectedItems$ = requestItems$.pipe(
      map(requestItems => requestItems.map(reqItem => reqItem.item))
    );

    this.viewState$ = combineLatest({
      patrimonies: patrimonies$,
      requestItems: requestItems$,
      selectedItems: selectedItems$
    });

    this.headerService.showBackButton();
  }

  selectItem(item: ItemPatrimony, patrimony: Patrimony): void {
    this.requestStateService.addItem(item, patrimony);
  }
  
  removeItemFromRequest(item: ItemPatrimony): void {
    this.requestStateService.removeItem(item);
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
    this.router.navigate(['/results'], { queryParams: { search: query } })
      .then(() => window.location.reload());
  }
}
