import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss'
})
export class SearchInput {
  @Input() placeholder: string = 'O que você está procurando?';
  @Output() search = new EventEmitter<string>;

  searchQuery: string = '';

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
