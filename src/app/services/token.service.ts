import {Injectable} from '@angular/core';
import {LocalStorageService} from "@services/local-storage.service";
import {ConstantsUtil} from "@utils/library/constants.util";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(
       private localStorageService: LocalStorageService,
    ) {}

    saveToken(token: string) {
        this.localStorageService.set(ConstantsUtil.TOKEN, token);
    }

    getToken(){
        return this.localStorageService.get(ConstantsUtil.TOKEN);
    }

    removeToken() {
        this.localStorageService.remove(ConstantsUtil.TOKEN);
    }

    saveRefreshToken(refresh: string) {
        this.localStorageService.set('refresh-token', refresh);
    }

}
