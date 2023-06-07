import { Routes } from '@angular/router';
import {authRedirectGuard} from "@core/guards/auth.guard";

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
        path: 'dashboard',
        canActivate: [authRedirectGuard],
        loadChildren: () => import('./dashboard/dashboard.routes').then(r=>r.dashboardRoutes),
    },
    {
        path: '**', redirectTo: 'home', pathMatch: "full",
    }
];
