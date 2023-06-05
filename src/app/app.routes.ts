import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./public/public.routes').then( (r) => r.publicRoutes),
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then( (r) => r.authRoutes),
    },
    {
        path: '**', redirectTo: 'auth', pathMatch: "full",
    }
];
