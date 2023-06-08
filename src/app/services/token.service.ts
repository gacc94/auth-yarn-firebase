import {Injectable} from '@angular/core';
import {LocalStorageService} from "@services/local-storage.service";
import {ConstantsUtil} from "@utils/library/constants.util";
import {CookieService} from "ngx-cookie-service";
import jwtDecode, {JwtPayload} from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(
       private localStorageService: LocalStorageService,
       private cookieService: CookieService,
    ) {}

    // const base64 = this.tokenService.getToken().split('.')[1];
    // const payload = JSON.parse(atob(base64));

    saveToken(token: string): void {
        this.localStorageService.set(ConstantsUtil.TOKEN, token);
        // this.cookieService.set(ConstantsUtil.TOKEN,token);
    }

    getToken(): string {
        // return this.cookieService.get(ConstantsUtil.TOKEN);
        return this.localStorageService.get(ConstantsUtil.TOKEN);
    }

    isCheckToken(token: string): boolean {
        // return this.cookieService.check(ConstantsUtil.TOKEN);
        return (Boolean(token));
    }

    isCheckRefreshToken(token: string): boolean {
        // return this.cookieService.check(ConstantsUtil.REFRESH_TOKEN);
        return (Boolean(this.getRefreshToken()));
    }

    removeToken(): void {
        // this.cookieService.delete(ConstantsUtil.TOKEN);
        this.localStorageService.remove(ConstantsUtil.TOKEN);
    }
    removeRefreshToken(): void {
        // this.cookieService.delete(ConstantsUtil.REFRESH_TOKEN);
        this.localStorageService.remove(ConstantsUtil.REFRESH_TOKEN);
    }

    saveRefreshToken(refreshToken: string): void {
        // this.cookieService.set(ConstantsUtil.REFRESH_TOKEN, refreshToken);
        this.localStorageService.set(ConstantsUtil.REFRESH_TOKEN, refreshToken);
    }

    getRefreshToken(): string {
        // return this.cookieService.get(ConstantsUtil.REFRESH_TOKEN);
        return this.localStorageService.get(ConstantsUtil.REFRESH_TOKEN);
    }

    getDecodeToken(token: string): JwtPayload {
        return jwtDecode<JwtPayload>(token);
    }

    isTokenExpired(token: string): boolean {
        if( !this.isCheckToken(token) ) {
            return false
        }
        const decodeToken: JwtPayload = this.getDecodeToken(token);
        if ( decodeToken && decodeToken.exp ) {
            const timeStamp = new Date().getTime();
            const timeToken = new Date(0).setUTCSeconds(decodeToken.exp);

            return timeToken > timeStamp;
        }
        return false;
    }

}
