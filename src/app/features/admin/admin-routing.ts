import { Routes } from '@angular/router';
import { Categories } from './pages/categories/categories';
import { LoanRequests } from './pages/loan-requests/loan-requests';
import { Loans } from './pages/loans/loans';
import { Patrimonies } from './pages/patrimonies/patrimonies';
import { Roles } from './pages/roles/roles';
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
    path: 'emprestimos',
    component: Loans
  },
  {
    path: 'usuarios',
    component: Users
  },
  {
    path: 'cargos',
    component: Roles
  }
];