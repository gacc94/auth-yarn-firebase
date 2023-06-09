import {
    Auth,
    authState,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider, onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword, updateProfile,
    User,
    UserCredential
} from '@angular/fire/auth';
import { inject, Injectable } from '@angular/core';
import { signInWithRedirect } from '@firebase/auth';
import { Router } from '@angular/router';
import {
    catchError,
    from,
    map,
    Observable, of,
    switchMap, tap,
    throwError
} from "rxjs";
import {RoutesUtils} from "@utils/library/routes.utils";
import {TokenService} from "@services/token.service";
import {ConstantsUtil} from "@utils/library/constants.util";
import {LocalStorageService} from "@services/local-storage.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly auth: Auth = inject(Auth);
    private readonly router: Router = inject(Router);
    private readonly googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
    private readonly tokenService: TokenService = inject(TokenService);
    private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

    get userState$(): Observable<User | null>{
        return authState(this.auth);
    }

    signInGoogle(): Observable<any> {
        return from(signInWithRedirect(this.auth, this.googleProvider)).pipe(
            /*
          * Aun falta setear el token del usuario al ingresar con google */
            tap((user) => {
                const userData = user as any;
                console.log(userData.accessToken)
                // this.tokenService.saveToken(userData.accessToken);
            }),
            catchError(this.handleError)
        );
    }

    async signOut(): Promise<void> {
        await this.auth.signOut().then( (res) => {
            // this.tokenService.removeToken();
            // this.tokenService.removeRefreshToken();
            this.localStorageService.clear();
            this.router.navigate([RoutesUtils.SIGN_IN]);
        }).catch((err) => {
            console.log(err);
        })
    }

    authentication() {
        return onAuthStateChanged(this.auth, (user: User |  null) => {

        });
    }

    async updateCurrentUser(user: User) {

        try {
            await updateProfile((user), {
                displayName: "Jane Q. User",
                photoURL: "https://example.com/jane-q-user/profile.jpg",
            }).then((res)=>{

            }).catch((err)=>{

            })
        } catch (e) {

        }
    }

    // signOut(): Observable<any>{
    //     return from(this.auth.signOut()).pipe(
    //         tap((res) => {
    //             this.tokenService.removeToken();
    //             this.tokenService.removeRefreshToken();
    //             this.router.navigate([RoutesUtils.SIGN_IN]);
    //             console.log('eSTOY HACIENDO LOGOUT');
    //         }),
    //         catchError(this.handleError ),
    //     );
    // }

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
            tap((userCredential: any) => {
                const { user } = userCredential;
                console.log(user.getIdTokenResult());
                const { accessToken, refreshToken } = userCredential.user.stsTokenManager;
                console.log( userCredential.user);
                this.saveUserLocalStorage(user);
                this.tokenService.saveToken(accessToken);
                this.tokenService.saveRefreshToken(refreshToken);
            }),
            map( ( { user } ) => {
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

    refreshAuthToken(): Observable<any>{
        if (!this.auth.currentUser) return of({}) ;
        return from(this.auth.currentUser.getIdToken(true));

        // return from(this.auth.currentUser?.getIdToken(true)).pipe(
        //     tap((token: string) => {
        //         this.tokenService.saveToken(token);
        //     })
        // )
    }

    private handleError(err: any) {
        // return of({} as T);
        return throwError(err);
    }

    private checkUserIsVerified(user: User): void {
        const route: string = user.emailVerified
            ? RoutesUtils.DASHBOARD
            : RoutesUtils.EMAIL_VERIFICATION;
        this.router.navigate([route]).then();
    }

    private saveUserLocalStorage(user: User) {
        this.localStorageService.set(ConstantsUtil.CURRENT_USER, user);
    }

}
