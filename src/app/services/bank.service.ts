import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BankInfoModel } from '../models/bank.info.model';
@Injectable({
    providedIn: 'root',
})
export class BankService {
    constructor(private http: HttpClient) {}

    createBank(bank: any) {
        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/create/bank', bank)
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
