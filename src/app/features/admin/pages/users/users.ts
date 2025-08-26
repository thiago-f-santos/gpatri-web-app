import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user-service';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserCard],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
  users$!: Observable<User[]>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  onView(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

}
