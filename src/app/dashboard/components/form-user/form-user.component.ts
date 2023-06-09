import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {IUser} from "../../common/interfaces/users.interface";
import {UserService} from "../../common/services/user.service";
import {Router} from "@angular/router";

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

    ngOnInit() {
        this.initForm()
    }

    initForm() {
        this.form = this._fb.group({
            id: ['', [Validators.required]],
            name: [],
            email: [],
            address: [this._fb.array([])],
        })
    }

    onSubmit() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return
        }

        const { id, name , email, address } = this.form.getRawValue();

        const userData: IUser = {id, name, email, address}

        this._dialogRef.close(userData);

    }

    onClose() {
        this._dialogRef.close(false);
    }

}
