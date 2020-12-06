import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private httpClient: HttpClient) { }

    private baseUrl = 'http://localhost:9090/signin';

    public loginUserFromRemote(user: User): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/login`, user);
    }

    public registerUserFromRemote(user: User): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/register`, user);
    }

}