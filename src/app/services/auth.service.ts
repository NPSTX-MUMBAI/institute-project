import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { StateService } from './state.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private stateSvc: StateService,
        private jwtHelper: JwtHelperService
    ) {}

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
                        resolve(res);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    login(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + '/auth/login', data).subscribe(
                (res: any) => {
                    if (res.status) {
                        resolve(res);
                        this.decodeAndSaveToken(res.token.accessToken);
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
    decodeAndSaveToken(token: string): void {
        try {
            const decodedToken = this.jwtHelper.decodeToken(token);
            localStorage.setItem('newUser', JSON.stringify(decodedToken));
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
}
