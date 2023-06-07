import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {AuthService} from "@services/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'gac-home',
    standalone: true,
    imports: [CommonModule, NavbarComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    private readonly authService: AuthService = inject(AuthService);

    user$!: Observable<any>;



    ngOnInit(): void{
        this.user$ = this.authService.userState$;
    }

}
