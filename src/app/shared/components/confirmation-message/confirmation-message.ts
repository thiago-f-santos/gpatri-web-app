import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-confirmation-message',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './confirmation-message.html',
  styleUrl: './confirmation-message.scss'
})
export class ConfirmationMessage {
  @Input() titleText!: string;
  @Input() messageText!: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(e?: Event): void {
    if (e) {
      e.stopPropagation();
    }
    this.cancel.emit();
  }

}
