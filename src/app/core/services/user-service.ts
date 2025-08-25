import { Injectable } from '@angular/core';
import { User, UserDto } from '../models/user.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    { id: 'uuid-user-1', name: 'Augusto', lastName: 'Cesar', email: 'augusto.cesar@email.com', role: 'Administração' },
    { id: 'uuid-user-2', name: 'Beatriz', lastName: 'Almeida', email: 'beatriz.almeida@email.com', role: 'Desenvolvimento' },
    { id: 'uuid-user-3', name: 'Carlos', lastName: 'Andrade', email: 'carlos.andrade@email.com', role: 'Financeiro' },
    { id: 'uuid-user-4', name: 'Augusto', lastName: 'Silva', email: 'augusto.silva@email.com', role: 'Desenvolvimento' },
  ];

  constructor() { }

  getUsers(): Observable<User[]> {
    return of([...this.mockUsers]).pipe(delay(300));
  }

  findUsersByName(searchTerm: string): Observable<User[]> {
    const lowerCaseTerm = searchTerm.toLowerCase().trim();
    
    if (!lowerCaseTerm) {
      return of([]);
    }

    const results = this.mockUsers.filter(user => {
      const fullName = `${user.name} ${user.lastName}`.toLowerCase();
      return fullName.includes(lowerCaseTerm);
    });

    return of(results).pipe(delay(300));
  }

  createUser(userDto: UserDto): Observable<User> {
    const newUser: User = {
      id: `uuid-user-${Math.random().toString(36).substring(2, 9)}`,
      ...userDto
    };
    this.mockUsers.push(newUser);
    return of(newUser).pipe(delay(300));
  }
  
  updateUser(updatedUser: User): Observable<User> {
    const index = this.mockUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.mockUsers[index] = updatedUser;
    }
    return of(updatedUser).pipe(delay(300));
  }
  
  deleteUser(userId: string): Observable<boolean> {
    const initialLength = this.mockUsers.length;
    this.mockUsers = this.mockUsers.filter(u => u.id !== userId);
    return of(this.mockUsers.length < initialLength).pipe(delay(300));
  }

  getUserById(id: string): Observable<User | undefined> {
    const user = this.mockUsers.find(u => u.id === id);
    return of(user).pipe(delay(300));
  }
}
