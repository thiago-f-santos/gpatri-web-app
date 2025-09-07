import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserService } from '../../../../core/services/user-service';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserCard],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  users$!: Observable<User[]>;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.userService.getUsers().pipe(
      catchError(() => {
        this.notificationService.showError('Falha ao carregar usuários.');
        return of([]);
      })
    );
  }

  onView(user: User): void {
    this.router.navigate(['/users', user.id]);
  }
}
