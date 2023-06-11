import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {checkToken} from "@core/interceptors/token.interceptor";
import {environment} from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private readonly http: HttpClient = inject(HttpClient);
    private API_URL = environment.apiUrlRestCountry;

    getCountries(): Observable<any> {
        const options = {
            context: checkToken()
        }
        return this.http.get(`${this.API_URL}/all`, options)
    }

    getCountryByName(name: string): Observable<any> {
        return this.http.get(`${this.API_URL}/name/${name}`, {context: checkToken()})
    }

}
