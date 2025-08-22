import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInput),
      multi: true
    }
  ]
})
export class SearchInput implements ControlValueAccessor {
  @Input() placeholder: string = 'O que você está procurando?';
  @Output() search = new EventEmitter<string>;

  value: string = '';
  isDisabled: boolean = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onSearch() {
    this.search.emit(this.value);
  }
}
