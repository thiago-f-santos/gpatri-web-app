import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Role, RoleDto } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/usuarios/api/v1/cargos`;

  getCargos(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  getCargoById(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  createCargo(cargoDto: RoleDto): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, cargoDto);
  }

  updateCargo(id: string, cargoDto: RoleDto): Observable<Role> {
    return this.http.patch<Role>(`${this.apiUrl}/${id}`, cargoDto);
  }

  deleteCargo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
