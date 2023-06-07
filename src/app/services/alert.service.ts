import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class AlertService {

    constructor(private _snackBar: MatSnackBar) {
    }

    snackBarError(message: string){
        this._snackBar.open(
            message,
            '🍕',
            {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                politeness: 'off',
                duration: 3000,
            });
    }
}
