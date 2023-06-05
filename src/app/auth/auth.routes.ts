import {Routes} from "@angular/router";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {EmailVerificationComponent} from "./pages/email-verification/email-verification.component";
import {ProfileComponent} from "./pages/profile/profile.component";

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'sign-in',
                title: 'Sign-In',
                component: SignInComponent,
            },
            {
                path: 'sign-up',
                title: 'Sign-Up',
                component: SignUpComponent
            },
            {
                path: 'email-verification',
                title: 'Email-verification',
                component: EmailVerificationComponent,
            },
            {
                path: 'profile',
                title: 'Profile',
                component: ProfileComponent,
            },
            {
                path: '**',
                redirectTo: 'sign-in',
                pathMatch: "full",
            }
        ]
    }
]