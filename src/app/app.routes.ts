import { Routes } from '@angular/router';
import { Admin } from './features/admin/admin';
import { ADMIN_ROUTES } from './features/admin/admin-routing';
import { loginGuard } from './core/guards/login-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup/signup').then(m => m.Signup)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./core/layout/layout').then(m => m.Layout),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/patrimony/homepage/homepage').then(m => m.Homepage)
            },
            {
                path: 'results',
                loadComponent: () => import('./features/patrimony/search-results/search-results').then(m => m.SearchResults)
            },
            {
                path: 'emprestimos',
                loadComponent: () => import('./features/loans/user-loans/user-loans').then(m => m.UserLoans)
            },
            {
                path: 'users/:id',
                loadComponent: () => import('./features/users/user-detail/user-detail').then(m => m.UserDetail)
            },
            {
                path: 'users/:id/edit',
                loadComponent: () => import('./features/users/edit-user/edit-user').then(m => m.EditUser)
            },
            {
                path: 'admin',
                component: Admin,
                children: ADMIN_ROUTES
            }
        ]
    },
];