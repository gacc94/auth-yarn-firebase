import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class AlertService {

    private readonly _snackBar: MatSnackBar = inject(MatSnackBar);

    snackBarError(message: string, icon: string = '🍕'){
        this._snackBar.open(
            message,
            icon,
            {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                politeness: 'off',
                duration: 3000,
            });
    }
}
