import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ErrorMessageComponent} from "../error-message/error-message.component";
import {AuthService} from "@services/auth.service";
import {Observable} from "rxjs";
import {ConstantsUtil} from "@utils/library/constants.util";

const actionType = {
    SignIn: {
        action: 'signIn',
        title: 'Sign In'
    },
    SignUp: {
        action: 'signUp',
        title: 'Sign Up'
    }
} as const;
type ActionType = keyof typeof actionType;

@Component({
    selector: 'gac-auth-form',
    standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, RouterLink, ErrorMessageComponent],
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit{
    action!: string;
    authForm!: FormGroup;

    user$!: Observable<any>;

    constructor(
        private readonly activateRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly fb: FormBuilder,
    ) {
        this.authService.signOut().then();
    }

    ngOnInit(): void {
        // const [ value] = this.router.url.split('/').slice(-1)
        this.action = this.activateRoute.snapshot.routeConfig?.path ?? '';
        console.log(this.action);
        this.initForm();
        this.user$ = this.authService.userState$;
    }

    initForm() {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        })
    }

    get email(): AbstractControl{
        return this.authForm.controls['email'];
    }

    get password(): AbstractControl{
        return this.authForm.controls['password'];
    }

    onSubmit(): void {
        if (!this.authForm.valid){
            this.authForm.markAllAsTouched();
            return;
        }

        const { email, password } = this.authForm.value;

        if (this.action === ConstantsUtil.SIGN_IN){
            this.signIn(email, password);
        } else if (this.action === ConstantsUtil.SIGN_UP){
            this.signUp(email, password);
        }
    }

    signInGoogle() {
        this.authService.signInGoogle().then();
    }

    errorMessage(field: string) {
        const control: AbstractControl = this.authForm.controls[field];
        if (control.hasError('required')){
            return ConstantsUtil.REQUIRED;
        } else if (control.hasError('minlength')){
            return ConstantsUtil.MIN_LENGTH;
        }
        return '';
    }

    hasError(field: string): boolean {
        const control: AbstractControl = this.authForm.controls[field];
        return (control.touched || control.dirty) && !control.valid;
    }

    private signIn(email: string, password: string) {
        this.authService.signIn(email, password).then();
    }

    private signUp(email: string, password: string) {
        this.authService.signUp(email, password).then();
    }

    navigate() {
        this.router.navigate([], {relativeTo: this.activateRoute}).then()
    }
}
