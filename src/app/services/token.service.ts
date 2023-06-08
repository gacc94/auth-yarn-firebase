import {Injectable} from '@angular/core';
import {LocalStorageService} from "@services/local-storage.service";
import {ConstantsUtil} from "@utils/library/constants.util";
import {CookieService} from "ngx-cookie-service";

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
        // this.localStorageService.set(ConstantsUtil.TOKEN, token);
        this.cookieService.set(ConstantsUtil.TOKEN,token);
    }

    getToken(): string {
        return this.cookieService.get(ConstantsUtil.TOKEN);
        // return this.localStorageService.get(ConstantsUtil.TOKEN);
    }

    isCheckToken(): boolean {
        return this.cookieService.check(ConstantsUtil.TOKEN);
    }

    isCheckRefreshToken() {
        return this.cookieService.check(ConstantsUtil.REFRESH_TOKEN);
    }

    removeToken(): void {
        this.cookieService.delete(ConstantsUtil.TOKEN);
        // this.localStorageService.remove(ConstantsUtil.TOKEN);
    }
    removeRefreshToken(): void {
        this.cookieService.delete(ConstantsUtil.REFRESH_TOKEN);
    }

    saveRefreshToken(refreshToken: string): void {
        this.cookieService.set(ConstantsUtil.REFRESH_TOKEN, refreshToken);
        // this.localStorageService.set(ConstantsUtil.REFRESH_TOKEN, refreshToken);
    }

    getRefreshToken(): string {
        return this.cookieService.get(ConstantsUtil.REFRESH_TOKEN);
    }

    private expiredToken() {

    }

}
