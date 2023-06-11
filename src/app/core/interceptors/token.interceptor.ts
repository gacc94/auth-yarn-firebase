import {
    HttpContext,
    HttpContextToken,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "@services/token.service";
import {catchError, Observable, of, tap} from "rxjs";


const CHECK_TOKEN = new HttpContextToken(()=>false);

export const checkToken = () => {
    return new HttpContext().set(CHECK_TOKEN,true);
}

export const tokenInterceptor: HttpInterceptorFn =
    (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

        const tokenService: TokenService = inject(TokenService);
        const token = tokenService.getToken()
        const isValidToken = tokenService.isTokenExpired(tokenService.getToken());
        console.log('Init Interceptor')
        const context = request.context.get(CHECK_TOKEN);

        if ( context && isValidToken) {
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
