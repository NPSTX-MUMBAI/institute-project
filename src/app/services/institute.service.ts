import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InstituteInfoModel } from '../models/institute-info.model';
@Injectable({
    providedIn: 'root',
})
export class InstituteService {
    constructor(private http: HttpClient) {}

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
}
