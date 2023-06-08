import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {AuthService} from "@services/auth.service";
import {TokenService} from "@services/token.service";
import {RoutesUtils} from "@utils/library/routes.utils";
import {getAuth} from "@angular/fire/auth";
import {LocalStorageService} from "@services/local-storage.service";

@Component({
    selector: 'gac-dashboard-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        NavbarComponent,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
    ],
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit{

    private breakpointObserver = inject(BreakpointObserver);
    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);
    private readonly tokenService: TokenService = inject(TokenService);


    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    async signOut(event: Event) {
        await this.authService.signOut().then();
    }

    goToUsers() {
        this.router.navigate([RoutesUtils.DASH_USERS]).then();
    }

    goToHome() {
        this.router.navigate([RoutesUtils.DASHBOARD]).then();
    }

    ngOnInit() {
    }
}
