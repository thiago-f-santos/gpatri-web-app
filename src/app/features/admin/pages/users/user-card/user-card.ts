import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss'
})
export class UserCard {
  @Input() user!: User;
  @Output() view = new EventEmitter<void>();

  onView(): void {
    this.view.emit();
  }
}
