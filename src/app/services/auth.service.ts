import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';
import { inject, Injectable } from '@angular/core';
import { signInWithRedirect } from '@firebase/auth';
import { Router } from '@angular/router';


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

    get userState$(){
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
            const { user } = await signInWithEmailAndPassword(this.auth, email, password);
            console.log(user);
            this.checkUserIsVerified(user);

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

    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(this.auth, email);
        } catch (err: unknown) {
            console.log('', err);
        }
    }
    private checkUserIsVerified(user: User): void {
        const route: string = user.emailVerified ? '/home' : '/auth/email-verification'
        this.router.navigate([route]).then();
    }



}
