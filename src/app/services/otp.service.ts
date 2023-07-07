import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root',
})
export class OtpService {
    constructor(private http: HttpClient, private stateSvc: StateService) {}

    verifyOtp(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/otp/verified/user', data)
                .subscribe(
                    (res: any) => {
                        console.log(res);
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

    timer(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + '/otp/create', data).subscribe(
                (res: any) => {
                    console.log(res);
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

    resetPassword(data: any) {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/auth/update/password', data)
                .subscribe(
                    (res: any) => {
                        console.log(res);
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
