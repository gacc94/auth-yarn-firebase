import {Injectable} from '@angular/core';
import Swal, {SweetAlertResult} from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertService {

    constructor() {
    }

    startAlertRefreshToken(timer: number): Promise<SweetAlertResult> {
        return Swal.fire({
            title: 'Token Expirando',
            text: `Tu sesión expirará en ${timer} minutos. Por favor, renueva tu token.`,
            icon: 'warning',
            confirmButtonText: 'Renovar Token'
        })
    }

    notification(title: string, icon: any = 'success'): void {
        Swal.fire({
            position: "center",
            icon,
            title,
            showConfirmButton: true,
        }).then()
    }



}
