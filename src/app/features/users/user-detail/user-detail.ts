import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user-service';
import { User } from '../../../core/models/user.model';
import { EMPTY, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})
export class UserDetail {
  user$!: Observable<User | undefined>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        const userId = params.get('id');
        if (userId) {
          return this.userService.getUserById(userId);
        }
        return EMPTY;
      })
    );
  }
}
