import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit} from '@angular/core';
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
import {MatSnackBarModule} from "@angular/material/snack-bar";
import firebase from "firebase/compat";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertService} from "@services/alert.service";
import FirebaseError = firebase.FirebaseError;

@Component({
    selector: 'gac-auth-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterLink,
        ErrorMessageComponent,
        MatSnackBarModule
    ],
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit, AfterViewInit{
    action!: string;
    authForm!: FormGroup;

    user$!: Observable<any>;
    isDisabled: boolean = false;

    constructor(
        private readonly activateRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly fb: FormBuilder,
        private readonly alertService: AlertService,
        private readonly destroyRef: DestroyRef,
        private readonly changeDetection: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        // const [ value] = this.router.url.split('/').slice(-1)
        this.action = this.activateRoute.snapshot.routeConfig?.path ?? '';
        console.log(this.action);
        this.user$ = this.authService.userState$;
        this.initForm();
    }

    initForm() {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(ConstantsUtil.PATTERN_EMAIL)]],
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

    ngAfterViewInit() {
        this.changeDetection.detectChanges();
    }

    signInGoogle() {
        this.authService.signInGoogle().pipe(
        ).subscribe({
            next: (value) => {
                console.log(value);
            }
        });
    }

    errorMessage(field: string): string {
        const control: AbstractControl = this.authForm.controls[field];
        let msg: string = '';
        if (control.hasError('required')){
            msg = ConstantsUtil.REQUIRED;
        } else if (control.hasError('minlength')){
            msg = ConstantsUtil.MIN_LENGTH;
        }
        return msg;
    }

    hasError(field: string): boolean {
        const control: AbstractControl = this.authForm.controls[field];
        return (control.touched || control.dirty) && !control.valid;
    }

    private signIn(email: string, password: string) {
        this.isDisabled = true
        return this.authService.signIn(email, password).pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (value) => {
                console.log(value);
            },
            error: (err: any) => {
                console.log({err});
                this.alertService.snackBarError(err.message);
            }
        });
    }

    private signUp(email: string, password: string) {
        this.authService.signUp(email, password).pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: ( value ) => {
                console.log(value);
            },
            error: (err: FirebaseError | any ) => {
                if ( err.customData._tokenResponse.error.code === 400 ) {
                    this.alertService.snackBarError(ConstantsUtil.EMAIL_IN_USE);
                }
                console.table(err);
                console.log(err.customData._tokenResponse.error.code)
            }
        })
    }

    navigate() {
        this.router.navigate([], {relativeTo: this.activateRoute}).then()
    }
}
