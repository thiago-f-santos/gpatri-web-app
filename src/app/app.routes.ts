import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup/signup').then(m => m.Signup)
    },
    {
        path: '',
        loadComponent: () => import('./core/layout/layout').then(m => m.Layout),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/patrimony/homepage/homepage').then(m => m.Homepage)
            },
            {
                path: 'results',
                loadComponent: () => import('./features/patrimony/search-results/search-results').then(m => m.SearchResults)}
        ]
    }
];
