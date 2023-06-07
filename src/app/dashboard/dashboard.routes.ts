import {Routes} from "@angular/router";
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout.component";

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(c=>c.HomeComponent),
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full',
            }
        ]
    }
]