import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@services/auth.service";
import {map, Observable, of, take, tap} from "rxjs";
import {RoutesUtils} from "@utils/library/routes.utils";
import {User} from "firebase/auth";

export const authGuard: CanActivateFn = () : Observable<boolean> | boolean | any => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    console.log('AuthGuard')
    return authService.userState$.pipe(
        take(1),
        tap((res: User | null) => console.log(res)),
        map( (isLoggedIn) => {
            if( isLoggedIn) {
                router.navigate([RoutesUtils.HOME]).then()
                return false;
            }
            return  true;
        }),
    );
};


export const emailVerificationGuard: CanActivateFn | any = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | any | boolean => {

    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    console.log('Email Verification Guard');
    return authService.userState$.pipe(
        take(1),
        tap((res: User | null) => console.log(res)),
        map((user: User | null ) => {
            if (!user) {
                router.navigate([RoutesUtils.SIGN_IN]).then();
                return false
            }
            return true
        })
    );


}