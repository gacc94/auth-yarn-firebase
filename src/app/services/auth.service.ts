import {
    Auth,
    authState,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification, signInWithEmailAndPassword
} from '@angular/fire/auth';
import { inject, Injectable } from '@angular/core';
import { signInWithRedirect, User } from '@firebase/auth';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import firebase from "firebase/compat";


interface ErrorResponse {
    code: string;
    message: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly auth: Auth = inject(Auth);
    private readonly router: Router = inject(Router);
    private readonly googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

    constructor(
    ) {}

    get authState$(){
        return authState(this.auth);
    }

    async signInGoogle(): Promise<void> {
        try {
            await signInWithRedirect(this.auth, this.googleProvider);
        } catch (err) {
            console.log('Google login', err);
        }
    }

    async signOut(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (err: unknown) {
            console.log('Google login', err);
        }
    }

    async signUp(email: string, password: string): Promise<void> {
        try{
            /*
          * Create Account */
            const { user } = await createUserWithEmailAndPassword(this.auth,email,password)
            await this.sendEmailVerification(user);
            /*
          * SendEmail */

            /*
          * Redirect to welcome */
            this.router.navigate(['/auth/email-verification']).then();
        } catch (err) {
            const { code, message } = err as ErrorResponse;
            console.log('Code', code);
            console.log('Message', message)

        }
    }

    async signIn(email: string, password: string): Promise<void> {
        try {
            /*
          * Sign In */
            const { user } = await signInWithEmailAndPassword(this.auth, email, password);
            console.log(user);
            /*
          * Check if user is already verify */
            this.checkUserIsVerified(user);
            /*
          * * Redirect to somewhere */
            this.router.navigate(['/auth/profile']).then();

        } catch (err) {
            const { code, message } = err as ErrorResponse;
            console.log('Code', code);
            console.log('Message', message)

        }
    }

    async sendEmailVerification(user: User): Promise<void> {
        try {
            await sendEmailVerification(user);
        } catch (err: unknown) {
            console.log('', err);
        }
    }

    private checkUserIsVerified(user: User): void {
        const verified = true;
        const route: string = verified ? '/home' : '/user/email-verification'
        this.router.navigate([route]).then();
    }

}
