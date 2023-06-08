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

    isCheckToken(): boolean {
        // return this.cookieService.check(ConstantsUtil.TOKEN);
        return (Boolean(this.getToken()));
    }

    isCheckRefreshToken(): boolean {
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

    getDecodeToken(): JwtPayload {
        return jwtDecode<JwtPayload>(this.getToken());
    }

    isTokenExpired(): boolean {
        if( !this.isCheckToken() ) {
            return false
        }

        const decodeToken: JwtPayload = this.getDecodeToken();

        if ( decodeToken && decodeToken.exp ) {
            const timeStamp = new Date().getTime();
            const timeToken = new Date(0).setUTCSeconds(decodeToken.exp);

            return timeToken > timeStamp;
        }
        return false;
    }

}
