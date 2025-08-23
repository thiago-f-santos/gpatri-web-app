import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [],
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.scss'
})
export class UserModal {
  @Output() yourInfosClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onYourInfosClick(): void {
    this.yourInfosClick.emit();
  }

  onLogoutClick(): void {
    this.logoutClick.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
