import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InstituteInfoModel } from '../models/institute-info.model';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class InstituteService {
    private errorSubject = new BehaviorSubject<any>(null);

    constructor(
        private http: HttpClient,
        private stateSvc: StateService,
        private router: Router
    ) {}

    createInstitute(instituteData: InstituteInfoModel) {
        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/create', instituteData)
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

    getInstitutesForUser(userId: string) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(
                    environment.url + '/school/getAll/school',
                    { userId: userId },
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
                        this.errorSubject.next(error);
                        reject(error);
                    }
                );
        });
    }
    addStd(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/create/standard', data, {
                    headers,
                })
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

    addDiv(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(environment.url + '/school/create/division', data, {
                    headers,
                })
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

    getAllStds(schoolId: string) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(
                    environment.url + '/school/getAll/Standard',
                    { schoolId: schoolId },
                    {
                        headers,
                    }
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

    getAllDivs(standardId: string) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(
                    environment.url + '/school/getAll/Division',
                    { standardId: standardId },
                    {
                        headers,
                    }
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

    getInstituteDetails(id: string) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return new Promise(async (resolve, reject) => {
            await this.http
                .post(
                    environment.url + '/school/get/School/Id',
                    { schoolId: id },
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

    getErrorObservable() {
        return this.errorSubject.asObservable();
    }
}
