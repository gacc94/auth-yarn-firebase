import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "@services/auth.service";
import {Router} from "@angular/router";
import {RoutesUtils} from "@utils/library/routes.utils";
import {TokenService} from "@services/token.service";
import {ConstantsUtil} from "@utils/library/constants.util";
import {tap} from "rxjs";

@Component({
    selector: 'gac-navbar',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);
    private readonly tokenService: TokenService = inject(TokenService);


    signIn(event: Event): void {
        this.router.navigate([RoutesUtils.SIGN_IN]).then();
    }

    signOut(evt: Event): void {
        this.tokenService.removeToken();
        // this.authService.signOut().pipe(
        //     tap(() => this.router.navigate([ConstantsUtil.SIGN_IN]).then())
        // )
    }
}
