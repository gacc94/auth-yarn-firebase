import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CountryService} from "../../common/services/country.service";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {RoutesUtils} from "@utils/library/routes.utils";

@Component({
    selector: 'gac-countries',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, NgOptimizedImage],
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
    private readonly countryService: CountryService = inject(CountryService);
    private readonly router : Router = inject(Router);
    countries!: any[];


    ngOnInit() {
        this.countryService.getCountries().subscribe({
            next: (countries) => {
                this.countries = countries;
                console.log(countries)
            }
        })

        this.countryService.getCountryByName('peru').subscribe({
            next: (value) => {
                console.log(value)
            }
        })
    }

    onDetails(country: any): void {
        this.router.navigateByUrl(
            `${RoutesUtils.DASH_COUNTRIES}/details`,
            {state: { country }});
    }
}
