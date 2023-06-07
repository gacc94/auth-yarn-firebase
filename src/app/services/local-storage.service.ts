import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    set(key: string, value: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e);
        }
    }

    get(key: string): any{
        try {
            const item: string | null = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.log(e);
        }
    }

    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.log(e);
        }
    }
}
