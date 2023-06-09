import {Injectable} from '@angular/core';
import Swal, {SweetAlertResult} from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertService {

    constructor() {
    }

    startAlertRefreshToken(timer: number): Promise<SweetAlertResult<any>> {
        return Swal.fire({
            title: 'Token Expirando',
            text: `Tu sesión expirará en ${timer} minutos. Por favor, renueva tu token.`,
            icon: 'warning',
            confirmButtonText: 'Renovar Token'
        })
    }




}
