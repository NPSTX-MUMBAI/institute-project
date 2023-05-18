import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdmissionService {
    constructor(private http: HttpClient) {}

    saveStudentDetails(data: any) {
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/admission/application/save', data)
                .subscribe((res) => {
                    resolve(res);
                });
        });
    }
}
