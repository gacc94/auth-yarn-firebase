import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "@services/token.service";
import {catchError, Observable, of, tap} from "rxjs";

export const tokenInterceptor: HttpInterceptorFn =
    (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    const tokenService: TokenService = inject(TokenService);
    const token = tokenService.getToken();
    console.log('Init Interceptor')

    if (token) {
        const authRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        });

        return next(authRequest).pipe(
            tap((res) => console.log('Soy Interceptor',res)),
            catchError((err) => {
                return of(err)
            })
        );
    }
    return next(request);
};

// export const addToken = ( )  =>{
//     const token =
//
// }
