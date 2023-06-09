import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@services/auth.service";
import {map, Observable, of, take, tap} from "rxjs";
import {RoutesUtils} from "@utils/library/routes.utils";
import {User} from "firebase/auth";
import {TokenService} from "@services/token.service";

export const authGuard: CanActivateFn = () : Observable<boolean> | boolean | any => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const token: TokenService = inject(TokenService);
    console.log('Auth Guard ')
    console.log(!token.isTokenExpired(token.getToken()))
    if (token.isTokenExpired(token.getToken())) {
        router.navigate([RoutesUtils.DASHBOARD]).then();
        return false;
    }
    return  true;
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

export const userGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const token: TokenService = inject(TokenService);
    console.log('Guard de Dashboard')
    console.log(token.isTokenExpired(token.getToken()));
    if (!token.isTokenExpired(token.getToken())) {
        router.navigate([RoutesUtils.SIGN_IN]).then();
        return false;
    }
    return  true;
}