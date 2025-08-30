import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../../../../core/models/role.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-card.html',
  styleUrl: './role-card.scss'
})
export class RoleCard {
  @Input() role!: Role;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}
