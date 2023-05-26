import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    createUser(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/auth/create', data)
                .subscribe((res) => {
                    resolve(res);
                });
        });
    }

    login(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/auth/create', data)
                .subscribe((res) => {
                    resolve(res);
                });
        });
    }
}
