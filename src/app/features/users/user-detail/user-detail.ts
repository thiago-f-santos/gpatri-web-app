import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Loan } from '../../../core/models/loan.model';
import { User } from '../../../core/models/user.model';
import { HeaderService } from '../../../core/services/header-service';
import { LoanService } from '../../../core/services/loan-service';
import { UserService } from '../../../core/services/user-service';
import { Button } from '../../../shared/components/button/button';
import { LoanDisplay } from '../../loans/components/loan-display/loan-display';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, LoanDisplay, Button],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})
export class UserDetail implements OnInit {
  user$!: Observable<User | undefined>;
  loans$!: Observable<Loan[]>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private loanService: LoanService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId$: Observable<string> = this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => !!id)
    );

    this.user$ = userId$.pipe(
      switchMap(id => this.userService.getUserById(id))
    );

    this.loans$ = userId$.pipe(
      switchMap(id => this.loanService.getLoansByUserId(id))
    );

    this.headerService.showBackButton();
  }

  onEditClick(user: User): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }
}
