import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StatusService {
    constructor(private http: HttpClient) {}
    schoolStatus(data: any) {
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/school/kyc/status', data)
                .subscribe((res) => {
                    resolve(res);
                });
        });
    }
}
