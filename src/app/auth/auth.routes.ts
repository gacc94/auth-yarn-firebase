import {Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {EmailVerificationComponent} from "./pages/email-verification/email-verification.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {authGuard, emailVerificationGuard} from "../core/guards/auth.guard";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'sign-in',
                title: 'Sign-In',
                loadComponent: () => import('./pages/sign-in/sign-in.component').then(c => c.SignInComponent),
                canActivate: [authGuard],
            },
            {
                path: 'sign-up',
                title: 'Sign-Up',
                loadComponent: () => import('./pages/sign-up/sign-up.component').then(c => c.SignUpComponent),
                canActivate: [authGuard],
            },
            {
                path: 'email-verification',
                title: 'Email-verification',
                loadComponent: () => import('./pages/email-verification/email-verification.component').then(c => c.EmailVerificationComponent),
                canActivate : [emailVerificationGuard],
            },
            {
                path: 'profile',
                title: 'Profile',
                component: ProfileComponent,
            },
            {
                path: 'forgot-password',
                title: 'Forgot-password',
                component: ForgotPasswordComponent,
            },
            {
                path: '**',
                redirectTo: 'sign-in',
                pathMatch: "full",
            }
        ]
    }
]