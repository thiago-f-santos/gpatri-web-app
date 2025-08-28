import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostBinding, Injector, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit{
  private static nextId = 0;
  public id = `app-input-${InputComponent.nextId++}`;

  constructor(private injector: Injector) { }

  @Input() label!: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'date' = 'text';
  @Input() backgroundColor: string = '#03060F';
  @Input() parentError: string | null = null;

  @Input() min: number | null = null;
  @Input() max: number | null = null;
  
  value: string = '';
  isDisabled: boolean = false;

  public ngControl: NgControl | null = null;

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  @HostBinding('class.textarea-host')
  get isTextarea(): boolean {
    return this.type === 'textarea';
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
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
