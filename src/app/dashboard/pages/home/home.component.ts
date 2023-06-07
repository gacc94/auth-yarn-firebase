import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "@services/token.service";
import {ConstantsUtil} from "@utils/library/constants.util";

@Component({
  selector: 'gac-home',
  standalone: true,
    imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {



    constructor(
        private cookieService: CookieService,
        private tokenService: TokenService,
    ) {
        const base64 = this.tokenService.getToken().split('.')[1];
        const payload = JSON.parse(atob(base64));
        console.log(payload);
        console.log(this.cookieService.check(ConstantsUtil.TOKEN));
    }
}
