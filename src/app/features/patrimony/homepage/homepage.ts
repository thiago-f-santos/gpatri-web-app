import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, take } from 'rxjs';
import { ItemPatrimony } from '../../../core/models/item-patrimony.model';
import { LoanDto } from '../../../core/models/loan.model';
import { Patrimony } from '../../../core/models/patrimony.model';
import { HeaderService } from '../../../core/services/header-service';
import { LoanService } from '../../../core/services/loan-service';
import { PatrimonyService } from '../../../core/services/patrimony-service';
import { Button } from '../../../shared/components/button/button';
import { InputComponent } from '../../../shared/components/input/input';
import { ItemDisplay } from '../../../shared/components/item-display/item-display';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { PatrimonyDisplay } from '../components/patrimony-display/patrimony-display';
import { RequestItem, RequestStateService } from '../services/request-state-service';
import { ConditionDisplayPipe } from '../../../shared/pipes/condition-display-pipe';

interface HomepageViewState {
  patrimonies: Patrimony[];
  requestItems: RequestItem[];
  selectedItems: ItemPatrimony[];
  returnDate: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchInput, PatrimonyDisplay, ItemDisplay, Button, InputComponent, ConditionDisplayPipe],
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
    const selectedItems$ = requestItems$.pipe(map(requestItems => requestItems.map(reqItem => reqItem.item)));
    const returnDate$ = this.requestStateService.returnDate$;

    this.viewState$ = combineLatest({
      patrimonies: patrimonies$,
      requestItems: requestItems$,
      selectedItems: selectedItems$,
      returnDate: returnDate$
    });

    this.headerService.showMenuButton();
  }

  selectItem(item: ItemPatrimony, patrimony: Patrimony): void {
    this.requestStateService.addItem(item, patrimony);
  }

  removeItemFromRequest(itemToRemove: ItemPatrimony): void {
    this.requestStateService.removeItem(itemToRemove);
  }

  onQuantityChange(item: ItemPatrimony, newQuantity: number): void {
    this.requestStateService.updateItemQuantity(item, newQuantity);
  }

  onDateChange(newDate: string): void {
    this.requestStateService.updateReturnDate(newDate);
  }

  confirmRequest(): void {
    combineLatest([
      this.requestStateService.requestItems$,
      this.requestStateService.returnDate$
    ]).pipe(take(1)).subscribe(([items, returnDate]) => {
      
      if (items.length === 0) return;

      const loanDto: LoanDto = {
        dataEmprestimo: new Date().toISOString(),
        dataDevolucao: new Date(returnDate + "T00:00:00").toISOString(),
        itensEmprestimo: items.map(reqItem => ({
          idItemPatrimonio: reqItem.item.id,
          quantidade: reqItem.quantity
        }))
      };

      this.loanService.createLoan(loanDto).subscribe({
        next: () => {
          this.requestStateService.clearRequest(); 
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
