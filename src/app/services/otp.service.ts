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
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + 'otp/verfied/user', data)
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
