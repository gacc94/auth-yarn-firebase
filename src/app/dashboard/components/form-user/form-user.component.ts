import {ChangeDetectorRef, Component, Inject, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {IUser} from "../../common/interfaces/users.interface";
import {UserService} from "../../common/services/user.service";
import {Router} from "@angular/router";
import {ConstantsUtil} from "@utils/library/constants.util";

@Component({
    selector: 'gac-form-user',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule
    ],
    templateUrl: './form-user.component.html',
    styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
    private readonly userService: UserService = inject(UserService);
    private readonly router: Router = inject(Router);
    private readonly _fb: FormBuilder = inject(FormBuilder);
    private _dialogRef: MatDialogRef<FormUserComponent> = inject(MatDialogRef);
    form!: FormGroup;
    action!: string;

    private data: IUser = inject(MAT_DIALOG_DATA);

    constructor(
        // @Inject(MAT_DIALOG_DATA) public data:any,
        private _cdRef:ChangeDetectorRef,
    ) {}

    ngOnInit() {
        console.log(this.data);
        this.initForm()
        if(this.data) {
            this.action = ConstantsUtil.UPDATE
            this.setCurrentUser();
        } else {
            this.action = ConstantsUtil.CREATE;
        }
    }

    initForm() {
        this.form = this._fb.group({
            name: ['', [Validators.required]],
            email: [''],
            addresses: this._fb.array([]),
        })
    }

    onSubmit() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return
        }

        const userData: IUser = {
            id: (this.data) ? this.data.id : `GA${Date.now().toString()}CC`,
            ...this.form.getRawValue(),
        }

        const setData = {
            userData,
            action: this.action,
        }

        console.log(setData);
        this._dialogRef.close(setData);

    }

    onClose(): void {
        this._dialogRef.close(false);
    }

    get addresses(): FormArray {
        return <FormArray>this.form.controls['addresses']
    }

    addAddressField() {
        this.addresses.push(this.createAddressField());
    }

    private createAddressField() {
        return this._fb.group({
            district: ['', Validators.required],
            street: ['', Validators.required],
        })
    }

    private setCurrentUser() {
        this.form.patchValue(this.data);
        this.data.addresses.forEach((address)=>{
            const current = this._fb.group({
                district: address.district,
                street: address.street,
            })
            this.addresses.push(current)
        })
    }
}
