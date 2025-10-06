import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserService } from '../../../../core/services/user-service';
import { UserCard } from './user-card/user-card';
import { Page } from '../../../../core/models/page.model';
import { Pagination } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserCard, Pagination],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  users$!: Observable<Page<User>>;
  currentPage = 0;
  pageSize = 5;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.userService.getUsers(this.currentPage, this.pageSize).pipe(
      catchError(() => {
        this.notificationService.showError('Falha ao carregar usuários.');
        return of({ content: [], page: { size: 5, number: 0, totalElements: 0, totalPages: 0 } });
      })
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  onView(user: User): void {
    this.router.navigate(['/users', user.id]);
  }
}
