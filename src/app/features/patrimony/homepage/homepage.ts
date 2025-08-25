import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Button } from '../../../shared/components/button/button';
import { ItemDisplay } from '../../../shared/components/item-display/item-display';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { PatrimonyDisplay } from '../components/patrimony-display/patrimony-display';
import { PatrimonyService } from '../../../core/services/patrimony-service';
import { RequestStateService } from '../services/request-state-service';
import { HeaderService } from '../../../core/services/header-service';
import { Patrimony } from '../../../core/models/patrimony.model';

export interface Item {
  id: string;
  name: string;
  condition: string;
  status: 'available' | 'borrowed';
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SearchInput, PatrimonyDisplay, ItemDisplay, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit{
  patrimonies$!: Observable<Patrimony[]>;
  requestItems$: Observable<Item[]>;

  constructor(
    private patrimonyService: PatrimonyService,
    private requestStateService: RequestStateService,
    private headerService: HeaderService,
    private router: Router
  ) {
    this.requestItems$ = this.requestStateService.requestItems$;
  }

  ngOnInit(): void {
    this.patrimonies$ = this.patrimonyService.getPatrimonies();
    this.headerService.showMenuButton();
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
