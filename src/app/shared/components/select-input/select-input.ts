// select.ts

import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInput),
      multi: true
    }
  ]
})
export class SelectInput implements ControlValueAccessor, OnInit {
  private static nextId = 0;
  public id = `app-select-${SelectInput.nextId++}`;

  constructor(private injector: Injector) { }

  @Input() label!: string;
  @Input() options: SelectOption[] = [];
  @Input() backgroundColor: string = '#03060F';
  @Input() parentError: string | null = null;
  @Input() isClearable?: boolean = false;

  value: string | number = '';
  isDisabled: boolean = false;

  public ngControl: NgControl | null = null;

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  @HostBinding('class.has-error')
  get hasErrorClass(): boolean {
    return this.isInvalid;
  }

  public get isInvalid(): boolean {
    if (!this.ngControl || !this.ngControl.control) {
      return false;
    }

    const control = this.ngControl.control;
    const form = control.parent;

    const isControlInvalid = control.invalid && control.touched;

    let hasParentError = false;
    if (form && this.parentError) {
      hasParentError = form.hasError(this.parentError) && control.touched;
    }

    return isControlInvalid || hasParentError;
  }
  
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
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this.value = '';
    this.onChange(this.value);
    this.onTouched();
  }
}