import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, Observable, of, switchMap } from 'rxjs';
import { Loan } from '../../../core/models/loan.model';
import { User } from '../../../core/models/user.model';
import { HeaderService } from '../../../core/services/header-service';
import { LoanService } from '../../../core/services/loan-service';
import { NotificationService } from '../../../core/services/notification.service';
import { UserService } from '../../../core/services/user-service';
import { Button } from '../../../shared/components/button/button';
import { LoanDisplay } from '../../loans/components/loan-display/loan-display';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, LoanDisplay, Button],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit {
  user$!: Observable<User | undefined>;
  loans$!: Observable<Loan[]>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private loanService: LoanService,
    private headerService: HeaderService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const userId$: Observable<string> = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id)
    );

    this.user$ = userId$.pipe(
      switchMap((id) =>
        this.userService.getUserById(id).pipe(
          catchError(() => {
            this.notificationService.showError('Não foi possível carregar os dados do usuário.');
            this.router.navigate(['/admin/users']);
            return of(undefined);
          })
        )
      )
    );

    this.loans$ = userId$.pipe(
      switchMap((id) =>
        this.loanService.getLoansByUserId(id, 0, 5).pipe(
          map((page) => page.content),
          catchError(() => {
            this.notificationService.showError('Não foi possível carregar os empréstimos do usuário.');
            return of([]);
          })
        )
      )
    );

    this.headerService.showBackButton();
  }

  onEditClick(user: User): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }
}
