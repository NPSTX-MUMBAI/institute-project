import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private isAuthenticated!: boolean;

    isAuthenticatedfn(): boolean {
        return this.isAuthenticated;
    }

    createUser(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + '/auth/create', data).subscribe(
                (res: any) => {
                    if (res.status) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    login(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + '/auth/login', data).subscribe(
                (res: any) => {
                    if (res.status) {
                        resolve(res);
                        this.isAuthenticated = true;
                    } else {
                        resolve(res);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}
