import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private stateSvc: StateService) {}

    private isAuthenticated!: boolean;

    isAuthenticatedfn(): boolean {
        const token = this.stateSvc.getUserData('accessToken');
        return !!token;
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
