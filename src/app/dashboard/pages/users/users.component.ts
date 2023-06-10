import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {MatButtonModule} from "@angular/material/button";
import {SweetAlertService} from "@services/sweet-alert.service";
import {UserService} from "../../common/services/user.service";
import {catchError, Observable, of, switchMap, tap, throwError} from "rxjs";
import {IUser} from "../../common/interfaces/users.interface";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormUserComponent} from "../../components/form-user/form-user.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {ConstantsUtil} from "@utils/library/constants.util";

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
        MatTooltipModule,
        MatListModule
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



    get configDialog() {
        const dialogConfig: MatDialogConfig = {
            disableClose: true,
            autoFocus: true,
            width: '35rem',
            height: 'auto',
            // maxWidth: '90%',
        }
        return dialogConfig;
    }

    afterDialog() {

    }

    openDialog(element?: IUser) {
        const dialogConfig: MatDialogConfig = {
            disableClose: true,
            autoFocus: true,
            width: '35rem',
            height: 'auto',
            // maxWidth: '90%',
        }
        if (element) {
            dialogConfig.data = element;
        }
        const dialogRef: MatDialogRef<FormUserComponent> =
            this._matDialog.open(FormUserComponent, dialogConfig);

        dialogRef.afterClosed().pipe(
            switchMap((data) => {
                if ( data.action === ConstantsUtil.UPDATE ) {
                    console.log('UPDATE');
                    return this.userService.updateUser(data.userData);
                } else if ( data.action === ConstantsUtil.CREATE ) {
                    console.log('CREATE');
                    return this.userService.addUser(data.userData);
                }
                return of({})
            }),
            catchError((err) => {
                return throwError(err);
            })
        ).subscribe({
            next: (value) => {
                if (value) {
                    this.sweetAlertService.notification('Creado Exitosamente');
                    console.log(value)
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    onDelete(id: string) {
        console.log(id);
        this.userService.deleteUser(id).then((e)=>console.log);
    }

}
