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

    saveToken(token: string) {
        // this.localStorageService.set(ConstantsUtil.TOKEN, token);
        this.cookieService.set(ConstantsUtil.TOKEN,token);
    }

    getToken(){
        return this.cookieService.get(ConstantsUtil.TOKEN);
        // return this.localStorageService.get(ConstantsUtil.TOKEN);
    }

    isCheckToken() {
        return this.cookieService.check(ConstantsUtil.TOKEN);
    }

    removeToken() {
        this.cookieService.delete(ConstantsUtil.TOKEN);
        // this.localStorageService.remove(ConstantsUtil.TOKEN);
    }

    saveRefreshToken(refreshToken: string) {
        this.cookieService.set(ConstantsUtil.REFRESH_TOKEN, refreshToken);
        // this.localStorageService.set(ConstantsUtil.REFRESH_TOKEN, refreshToken);
    }

}
