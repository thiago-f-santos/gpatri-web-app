import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Permission } from '../../shared/enums/permissions';
import { LoginRequest, LoginResponse } from '../models/auth.model';

interface DecodedToken {
  userId: string;
  permissoes: Permission[]; 
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

  private currentUserPermissionsSubject = new BehaviorSubject<Permission[]>([]);
  public currentUserPermissions$ = this.currentUserPermissionsSubject.asObservable();

  constructor() {
    this.loadUserIdFromToken();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.isAuthenticatedSubject.next(true);
        this.loadUserIdFromToken();
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserIdSubject.next(null);
    this.currentUserPermissionsSubject.next([]);
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
        this.currentUserPermissionsSubject.next(decodedToken.permissoes || []);
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        this.logout();
      }
    }
  }

  public hasPermission(permission: Permission): boolean {
    const currentPermissions = this.currentUserPermissionsSubject.getValue();
    return currentPermissions.includes(permission);
  }

  public get isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  public get currentUserId(): string | null {
    return this.currentUserIdSubject.getValue();
  }
}
