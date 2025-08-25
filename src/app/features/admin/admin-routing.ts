import { Routes } from '@angular/router';
import { Patrimonies } from './pages/patrimonies/patrimonies';
import { Categories } from './pages/categories/categories';
import { LoanRequests } from './pages/loan-requests/loan-requests';
import { Users } from './pages/users/users';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'patrimonios',
    pathMatch: 'full'
  },
  {
    path: 'patrimonios',
    component: Patrimonies
  },
  {
    path: 'categorias',
    component: Categories
  },
  {
    path: 'solicitacoes',
    component: LoanRequests
  },
  {
    path: 'usuarios',
    component: Users
  }
];