import {Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {authGuard, emailVerificationGuard} from "../core/guards/auth.guard";

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
                path: 'forgot-password',
                title: 'Forgot-password',
                loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(c=>c.ForgotPasswordComponent),
            },
            {
                path: '**',
                redirectTo: 'sign-in',
                pathMatch: "full",
            }
        ]
    }
]