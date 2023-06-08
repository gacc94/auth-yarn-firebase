import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthService} from "@services/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "@services/token.service";
import {RoutesUtils} from "@utils/library/routes.utils";
import {User} from "firebase/auth";

@Component({
  selector: 'gac-navbar',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);
    private readonly tokenService: TokenService = inject(TokenService);

    ngOnInit() {
        this.authService.userState$.subscribe({
            next: (user: User | null) => {
                if (!user) {
                    // this.router.navigate([RoutesUtils.SIGN_IN]).then();
                }
                console.log(user);
            }
        })
    }

    async signOut(event: Event) {
        // await this.authService.signOut().then();
    }
}
