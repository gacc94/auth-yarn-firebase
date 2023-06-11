import {Routes} from "@angular/router";
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout.component";
import {userGuard} from "@core/guards/auth.guard";

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: 'home',
                canActivate: [userGuard],
                loadComponent: () => import('./pages/home/home.component').then(c=>c.HomeComponent),

            },
            {
                path: 'users',
                canActivate: [userGuard],
                loadComponent: () => import('./pages/users/users.component').then(c=>c.UsersComponent),
            },
            {
                path: 'countries',
                loadComponent: () => import('./pages/countries/countries.component').then(c=>c.CountriesComponent),
            },
            {
                path: 'countries/details',
                loadComponent: () => import('./pages/detail-country/detail-country.component').then(c=>c.DetailCountryComponent)
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full',
            }
        ]
    }
]