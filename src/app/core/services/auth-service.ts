import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user-service';

interface DecodedToken {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = `${environment.apiUrl}/usuarios/api/v1/auth`;

  private readonly TOKEN_KEY = 'authToken';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserIdSubject = new BehaviorSubject<string | null>(null);
  public currentUserId$ = this.currentUserIdSubject.asObservable();

  constructor(
    private userService: UserService
  ) {
    this.loadUserIdFromToken();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        const decodedToken: DecodedToken = jwtDecode(response.token);
        this.currentUserIdSubject.next(decodedToken.userId);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserIdSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private loadUserIdFromToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        this.currentUserIdSubject.next(decodedToken.userId);
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        this.logout();
      }
    }
  }

  public get isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  public get currentUserId(): string | null {
    return this.currentUserIdSubject.getValue();
  }
}
