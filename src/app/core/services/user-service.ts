import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';
import { User, UserDto, UserRoleDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/usuarios/api/v1/usuarios`;

  getUsers(page: number, size: number): Observable<Page<User>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('sortBy', 'nome').set('direction', 'ASC');
    return this.http.get<Page<User>>(this.apiUrl, { params });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(userDto: UserDto): Observable<User> {
    return this.http.post<User>(this.apiUrl, userDto);
  }

  updateUser(id: string, userDto: Partial<UserDto>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, userDto);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  assignRoleToUser(userId: string, roleDto: UserRoleDto): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}/cargo`, roleDto);
  }
}
