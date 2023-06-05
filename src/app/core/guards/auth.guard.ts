import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@services/auth.service";
import {take, tap} from "rxjs";

export const authGuard = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    console.log('AuthGuard')
    return authService.userState$.pipe(
        take(1),
        tap(res => console.log(!res)),
        tap( (isLoggedIn) => {
            (!!isLoggedIn) ? router.navigate(['/home']) : true
        } ),
    );
};
