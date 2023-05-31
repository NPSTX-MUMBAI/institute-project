import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BankService {
    constructor(private http: HttpClient) {}

    createBank(data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + '/school/addbank', data).subscribe(
                (res: any) => {
                    if (res.status) {
                        resolve(res.data);
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
