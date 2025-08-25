import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemPatrimony } from '../../../core/models/item-patrimony.model';
import { Patrimony } from '../../../core/models/patrimony.model';
import { HeaderService } from '../../../core/services/header-service';
import { PatrimonyService } from '../../../core/services/patrimony-service';
import { Button } from '../../../shared/components/button/button';
import { ItemDisplay } from '../../../shared/components/item-display/item-display';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { PatrimonyDisplay } from '../components/patrimony-display/patrimony-display';
import { RequestStateService } from '../services/request-state-service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, PatrimonyDisplay, ItemDisplay, SearchInput, Button],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults implements OnInit{
  patrimonies$!: Observable<Patrimony[]>;
  requestItems$: Observable<ItemPatrimony[]>;
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

  selectItem(item: ItemPatrimony): void {
    this.requestStateService.addItem(item);
  }
  
  removeItemFromRequest(item: ItemPatrimony): void {
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
