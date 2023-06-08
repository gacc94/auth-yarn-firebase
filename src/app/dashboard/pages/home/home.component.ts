import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "@services/token.service";
import jwtDecode, {JwtPayload} from "jwt-decode";

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

        const decoded: JwtPayload = jwtDecode<JwtPayload>(this.tokenService.getToken());
        const tokenDate = new Date(0);

        if (decoded.exp) {
            console.log(decoded.exp);
            console.log(tokenDate.setUTCSeconds(decoded.exp));

            const today =  new Date();
            console.log( tokenDate.getTime() );
            console.log( today.getTime());
            console.log( tokenDate.getTime() > today.getTime());
            console.log( (today.getTime() - tokenDate.getTime()) );
            // return ( tokenDate.getTime() > today.getTime());
        }

        // const decoded2 = jwtDecode(this.tokenService.getRefreshToken());
        console.log(decoded);
    }
}
