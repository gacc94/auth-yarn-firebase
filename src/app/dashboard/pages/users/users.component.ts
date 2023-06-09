import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {MatButtonModule} from "@angular/material/button";
import {SweetAlertService} from "@services/sweet-alert.service";
import {UserService} from "../../common/services/user.service";
import {Observable} from "rxjs";
import {IUser} from "../../common/interfaces/users.interface";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {FormUserComponent} from "../../components/form-user/form-user.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
    selector: 'gac-users',
    standalone: true,
    imports: [
        CommonModule,
        SweetAlert2Module,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule
    ],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    private readonly sweetAlertService: SweetAlertService = inject(SweetAlertService);
    private readonly userService: UserService = inject(UserService);
    private readonly _matDialog: MatDialog = inject(MatDialog);
    private destroyRef: DestroyRef = inject(DestroyRef);

    users$: Observable<IUser[]> = <Observable<IUser[]>>this.userService.getUsers();

    displayedColumns: string[] = ['id', 'name', 'email', 'option'];


    ngOnInit() {
        this.users$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (value) => {
                console.log(value);
            }
        })
    }

    onCreate() {
        const dialogConfig: MatDialogConfig = {
            disableClose: true,
            autoFocus: true,
            width: '25rem',
            height: 'auto',
            // maxWidth: '90%',
        }

        const dialogRef =
            this._matDialog.open(FormUserComponent, dialogConfig);


        dialogRef.afterClosed().pipe(
        ).subscribe({
            next: (value) => {
                console.log(value)
            }
        });
    }


}
