import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-modal',
  standalone: true,
  imports: [],
  templateUrl: './menu-modal.html',
  styleUrl: './menu-modal.scss'
})
export class MenuModal {
  @Input() showAdminArea: boolean = false;

  @Output() adminAreaClick = new EventEmitter<void>();
  @Output() loansClick = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onAdminAreaClick(): void {
    this.adminAreaClick.emit();
  }

  onLoansClick(): void {
    this.loansClick.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
