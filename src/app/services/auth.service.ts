import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';
import { inject, Injectable } from '@angular/core';
import { signInWithRedirect } from '@firebase/auth';
import { Router } from '@angular/router';
import {
    catchError,
    EMPTY,
    from, fromEvent, interval,
    map,
    Observable,
    ObservableInput,
    of,
    OperatorFunction,
    switchMap, take, takeLast,
    throwError
} from "rxjs";
import {RoutesUtils} from "@utils/library/routes.utils";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;
import {HttpErrorResponse} from "@angular/common/http";



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

    get userState$(): Observable<User | null>{
        return authState(this.auth);
    }

    signInGoogle(): Observable<any> {
        return from(signInWithRedirect(this.auth, this.googleProvider));
    }

    async signOut(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (err: unknown) {
            console.log('Google login', err);
        }
    }

    signUp(email: string, password: string): Observable<any> {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
            catchError( this.handleError ),
            switchMap((userCredential: UserCredential) => {
                const { user } = userCredential;
                return this.sendEmailVerification(user).pipe(
                    map( ( ) => this.router.navigate([RoutesUtils.EMAIL_VERIFICATION]) )
                )
            })
        );
    }

    signIn(email: string, password: string): Observable<any> {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            map( ( { user } ) => {
                console.log(user);
                this.checkUserIsVerified(user);
            }),
            catchError( this.handleError )
        );
    }

    sendEmailVerification(user: User): Observable<void> {
        return from(sendEmailVerification(user)).pipe(
            catchError(this.handleError ),
        );
    }

    sendPasswordResetEmail(email: string): Observable<void>{
        return from(sendPasswordResetEmail(this.auth, email)).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: any) {
        // return of({} as T);
        return throwError(err);
    }

    private checkUserIsVerified(user: User): void {
        const route: string = user.emailVerified
            ? RoutesUtils.HOME
            : RoutesUtils.EMAIL_VERIFICATION;
        this.router.navigate([route]).then();
    }



}
