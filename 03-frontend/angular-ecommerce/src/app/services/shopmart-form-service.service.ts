import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
    providedIn: 'root'
})
export class ShopmartFormServiceService {

    constructor(private httpClient: HttpClient) { }

    private countryUrl = 'http://localhost:9090/api/countries';
    private statesUrl = 'http://localhost:9090/api/states';

    getCountries(): Observable<Country[]> {
        return this.httpClient.get<GetCountryResponse>(this.countryUrl).pipe(map(response => response._embedded.countries));
    }

    getStates(theCountryCode: String): Observable<State[]> {
        const tempStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
        return this.httpClient.get<GetStateResponse>(tempStatesUrl).pipe(map(response => response._embedded.states));
    }

    getCreditCardMonths(startMonth: number): Observable<number[]> {

        let data: number[] = [];

        for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
            data.push(theMonth);
        }

        return of(data);    // 'of' will wrap data as observable.
    }

    getCreditCardYears(): Observable<number[]> {

        let data: number[] = [];

        // start at current year and loop for next ten years
        const startYear: number = new Date().getFullYear();
        const endYear: number = startYear + 10;

        for (let theYear = startYear; theYear <= endYear; theYear++) {
            data.push(theYear);
        }

        return of(data);
    }
}

interface GetCountryResponse {
    _embedded: {
        countries: Country[];
    }
}
interface GetStateResponse {
    _embedded: {
        states: State[];
    }
}
