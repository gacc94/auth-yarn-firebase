import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "@services/auth.service";
import {delay, Observable, tap} from "rxjs";
import {User} from "firebase/auth";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'gac-email-verification',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit{

    private readonly authService: AuthService = inject(AuthService);
    user$!: Observable<User | null>;

    constructor() {
        this.user$ = this.authService.userState$;
    }

    ngOnInit() {
    }

    onResendEmail(user: User): void {
        console.log(user)
        this.authService.sendEmailVerification(user).pipe(
        ).subscribe({
            next: (value) => {
                console.log(value);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

}
