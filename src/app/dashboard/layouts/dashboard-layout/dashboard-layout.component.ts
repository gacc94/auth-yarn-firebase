import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterLinkActive, RouterOutlet} from "@angular/router";
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
import {SweetAlertService} from "@services/sweet-alert.service";
import {SweetAlertResult} from "sweetalert2";
import {JwtPayload} from "jwt-decode";
import {ConstantsUtil} from "@utils/library/constants.util";
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
        RouterLinkActive,
        NgOptimizedImage,
    ],
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

    private breakpointObserver = inject(BreakpointObserver);
    private readonly authService: AuthService = inject(AuthService);
    private readonly router: Router = inject(Router);
    private readonly tokenService: TokenService = inject(TokenService);
    private readonly sweetAlertService = inject(SweetAlertService);
    private readonly localStorageService:LocalStorageService = inject(LocalStorageService);

    photoUrl!: string;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(result => result.matches),
            shareReplay()
        );

    ngOnInit() {
        this.startTokenTimer();
        this.photoUrl = this.localStorageService.get(ConstantsUtil.CURRENT_USER).photoURL;
    }

    async signOut(event: Event) {
        await this.authService.signOut()
    }

    goToUsers(): void {
        this.router.navigate([RoutesUtils.DASH_USERS]).then();
    }

    goToHome(): void {
        this.router.navigate([RoutesUtils.DASH_HOME]).then();
    }

    goToCountries(): void {
        this.router.navigate([RoutesUtils.DASH_COUNTRIES]).then();
    }

    startTokenTimer(): void {
        const decodeToken: JwtPayload = this.tokenService.getDecodeToken(this.tokenService.getToken());
        const timeStamp = new Date().getTime();
        const timeToken = new Date(0).setUTCSeconds((decodeToken.exp as number));
        const timeRemaining = timeToken - timeStamp;
        const timeThreshold: number = 300000; // Umbral de tiempo en milisegundos (5 minutos)

        console.log('Time Expired', timeRemaining / 60000)

        // if (timeRemaining >= timeThreshold) {
        const minutes = Math.ceil(timeRemaining / 60000);

        setTimeout(() => {
            this.sweetAlertService.startAlertRefreshToken(minutes).then((res: SweetAlertResult) => {
                if (res.isConfirmed) {
                    this.authService.refreshAuthToken().subscribe()
                } else {
                    console.log('Su tiempo se expirara')
                }
            })
        }, timeRemaining)

        // }
    }

}
