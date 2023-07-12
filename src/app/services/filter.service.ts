import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    constructor(private http: HttpClient, private stateSvc: StateService) {}
    schoolFilter(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/getAll/filter/school', data, {
                    headers,
                })
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

    bankFilter(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/getAll/filter/bank', data, {
                    headers,
                })
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

    staffFilter(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/getAll/filter/staff', data, {
                    headers,
                })
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

    studentFilter(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/getAll/filter/student', data, {
                    headers,
                })
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
