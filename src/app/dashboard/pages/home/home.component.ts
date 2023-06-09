import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "@services/token.service";
import {Auth, getAuth} from "@angular/fire/auth";
import {AuthService} from "@services/auth.service";
import firebase from "firebase/compat";
import IdTokenResult = firebase.auth.IdTokenResult;

@Component({
    selector: 'gac-home',
    standalone: true,
    imports: [CommonModule, NavbarComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    private readonly auth: Auth = inject(Auth);
    private readonly cookieService: CookieService = inject(CookieService);
    private readonly tokenService: TokenService = inject(TokenService);
    private readonly authService: AuthService = inject(AuthService);


    ngOnInit() {
        this.auth.currentUser?.getIdTokenResult(true).then((res: IdTokenResult)=>{
            // console.log(res.token);
            console.log(this.tokenService.getDecodeToken(res.token));
        }).catch((err)=> {
            console.log(err);
        });
        this.authService.userState$;
    }

}
