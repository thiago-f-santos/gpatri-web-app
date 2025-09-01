import { NgStyle } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() text: string = 'Texto Padrão';
  @Input() backgroundColor: string = '#01B0F1';
  @Input() hoverColor: string = '#0088BA';
  @Input() textColor: string = '#FFFFFF';
  @Input() height: string = '56px';
  @Input() width: string = '100%';
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<MouseEvent>();

  @HostBinding('style')
  get dynamicStyle() {
    return {
      '--background-color-btn': this.backgroundColor,
      '--hover-color-btn': this.hoverColor,
    };
  }

  onButtonClick(event: MouseEvent): void {
    if (!this.disabled) {
      event.stopPropagation();
      this.onClick.emit();
    }
  }
}
