import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BankInfoModel } from '../models/bank.info.model';
import { Observable } from 'rxjs';
import { ACCOUNT_TYPE, Bank } from '../models/bank.model';
import { StateService } from './state.service';

const ROOT_URL: string = 'https://ifsc.razorpay.com/';
@Injectable({
    providedIn: 'root',
})
export class BankService {
    constructor(private http: HttpClient, private stateSvc: StateService) {}

    findBankByIFSCCode(code: string): Observable<Bank> {
        return new Observable((obs) => {
            this.http.get(ROOT_URL + code).subscribe(
                (r: any) => {
                    console.log(r);
                    if (r) {
                        let bank: Bank = {
                            bankname: r.BANK,
                            accountHolderName: '',
                            accountNo: '',
                            accountType: ACCOUNT_TYPE.CURRENT,
                            address: r.ADDRESS,
                            bankCode: r.BANKCODE,
                            branch: r.BRANCH,
                            city: r.CITY,
                            centre: r.CENTRE,
                            district: r.DISTRICT,
                            ifsc: r.IFSC,
                            state: r.STATE,
                            imps: r.IMPS,
                            micr: r.MICR,
                            neft: r.NEFT,
                            rtgs: r.RTGS,
                            upi: r.UPI,
                        };
                        obs.next(bank);
                    } else {
                        console.log(`Error: IFSC code ${code} not found`);
                        obs.error(`IFSC code ${code} not found`);
                    }
                },

                (err) => {
                    console.log(`Error: ${err.status} - ${err.statusText}`);
                    obs.error(`Error: ${err.status} - ${err.statusText}`);
                }
                // throw new Error('Method not implemented.');
            );
        });
    }

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

    getBanksBySchoolId(schoolId: string) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(
                    environment.url + '/school/getAll/bank',
                    { schoolId: schoolId },
                    { headers }
                )
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
    getBankDetailsById(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(
                    environment.url + '/school/get/bank/Id',
                   data,
                    { headers }
                )
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
