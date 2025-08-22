import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, Patrimony, PatrimonyService } from '../services/patrimony-service';
import { RequestStateService } from '../services/request-state-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatrimonyDisplay } from '../components/patrimony-display/patrimony-display';
import { ItemDisplay } from '../../../shared/components/item-display/item-display';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { Button } from '../../../shared/components/button/button';
import { HeaderService } from '../../../core/services/header-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, PatrimonyDisplay, ItemDisplay, SearchInput, Button],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults implements OnInit{
  patrimonies$!: Observable<Patrimony[]>;
  requestItems$: Observable<Item[]>;
  searchQuery: string = '';

  constructor(
    private patrimonyService: PatrimonyService,
    private requestStateService: RequestStateService,
    private headerService: HeaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.requestItems$ = this.requestStateService.requestItems$;
  }

  ngOnInit(): void {
    this.patrimonies$ = this.patrimonyService.getPatrimonies();
    this.headerService.showBackButton();
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('search') || '';
      console.log(this.searchQuery);
    });
  }

  selectItem(item: Item): void {
    this.requestStateService.addItem(item);
  }
  
  removeItemFromRequest(item: Item): void {
    this.requestStateService.removeItem(item);
  }

  confirmRequest(): void {
    console.log('Solicitação confirmada com os seguintes itens:', this.requestItems$);
  }

  onSearch(query: string): void {
    if (query) {
      this.router.navigate(['/results'], { queryParams: { search: query } });
    }
  }
}
