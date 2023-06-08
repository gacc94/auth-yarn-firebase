import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "@services/token.service";
import {getAuth} from "@angular/fire/auth";

@Component({
    selector: 'gac-home',
    standalone: true,
    imports: [CommonModule, NavbarComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    constructor(
        private cookieService: CookieService,
        private tokenService: TokenService,
    ) {}

    ngOnInit() {
        console.log(getAuth().currentUser);
        console.log('xd')
    }

}
