import {Injectable} from '@angular/core';
import {
    HttpContext,
    HttpContextToken,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from "@services/token.service";

const CHECK_TOKEN = new HttpContextToken(()=>false);

export const checkToken = () => {
    return new HttpContext().set(CHECK_TOKEN,true);
}

@Injectable({
    providedIn: "root",
})
export class TokenIntInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('TokenInterceptor');
        if(request.context.get(new HttpContextToken<boolean>(()=>false))) {
            return this.addToken(request, next);
        }
        return next.handle(request);
    }

    private addToken(request: HttpRequest<any>, next: HttpHandler){
        const token = this.tokenService.getToken();

        if(token) {
            const authReq = request.clone({
                headers: request.headers.set(`Authorization`,`Bearer ${token}`)
            })

            return next.handle(authReq);
        }
        return next.handle(request);

    }
}

