import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + '/auth/login', data).subscribe(
                (res: any) => {
                    console.log(res);
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

    createStaff(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/auth/create/staff', data, { headers })
                .subscribe(
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

    getStaff(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/auth/getStaff', data, { headers })
                .subscribe(
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
}
