import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InstituteInfoModel } from '../models/institute-info.model';
import { StateService } from './state.service';
@Injectable({
    providedIn: 'root',
})
export class InstituteService {
    constructor(private http: HttpClient, private stateSvc: StateService) {}

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
}
