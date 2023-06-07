import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthFormComponent} from "../../components/auth-form/auth-form.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ConstantsUtil} from "@utils/library/constants.util";
import {AuthService} from "@services/auth.service";
import {tap} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
    selector: 'gac-forgot-password',
    standalone: true,
    imports: [
        CommonModule,
        AuthFormComponent,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterLink,
        MatSnackBarModule,
    ],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly authService: AuthService = inject(AuthService);

    constructor(
        private _snackBar: MatSnackBar
    ) {}

    forgotForm!: FormGroup;
    isEmailSend: boolean = false;

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.forgotForm = this.fb.group({
            email: ['', [ Validators.required, Validators.pattern(ConstantsUtil.PATTERN_EMAIL) ]]
        })
    }

    get email(): AbstractControl {
        return this.forgotForm.controls['email'];
    }

    onSubmit(event: Event) {
        event?.stopPropagation();
        console.log()
        if (!this.forgotForm.valid) {
            this.forgotForm.markAllAsTouched();
            return;
        }

        this.authService.sendPasswordResetEmail(this.forgotForm.controls['email'].value).pipe(
            tap( (res) => console.log(res))
        ).subscribe({
            next: (value) => {
                this.isEmailSend = true;
                console.log(value);
            },
            error: ({code, message}) => {
                this.isEmailSend = false;
                this._snackBar.open(
                    ConstantsUtil.EMAIL_NOT_EXIST,
                    '🍕',
                    {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        politeness: 'off',
                        duration: 3000,
                    });
                console.table( code, message );
            }
        })
    }

    hasError(field: string): boolean {
        const control: AbstractControl = this.forgotForm.controls[field];
        return (control.touched || control.dirty) && !control.valid;
    }

    errorMessage(field: string): string | undefined {
        const control: AbstractControl = this.forgotForm.controls[field];
        if (control.hasError('required')){
            return ConstantsUtil.REQUIRED;
        } else if (control.hasError('pattern')){
            return ConstantsUtil.PATTERN;
        }
        return
    }
}
