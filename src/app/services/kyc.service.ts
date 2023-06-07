import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class KycService {
    constructor(private http: HttpClient) {}

    uploadKyc(data: any) {
        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/kyc/upload/Kyc/School', data)
                .subscribe(
                    (res: any) => {
                        if (res.status) {
                            resolve(res);
                            console.log(res);
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
