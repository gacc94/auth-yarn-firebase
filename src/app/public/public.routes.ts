import {Routes} from "@angular/router";
import {PublicLayoutComponent} from "./layout/public-layout/public-layout.component";
import {HomeComponent} from "./pages/home/home.component";

export const publicRoutes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                title: 'Home',
                component: HomeComponent,
            }
        ]
    }
]