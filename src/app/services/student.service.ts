import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    constructor(private http: HttpClient, private stateSvc: StateService) {}
    createStudent(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/student/create', data, { headers })
                .subscribe((res) => {
                    resolve(res);
                });
        });
    }

    getStudents(schoolId: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    environment.url + '/student/getAll/school/student',
                    { schoolId: schoolId },
                    { headers }
                )
                .subscribe((res) => {
                    resolve(res);
                });
        });
    }

    getStudentDetails(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/student/get/student', data, {
                    headers,
                })
                .subscribe((res) => {
                    resolve(res);
                });
        });
    }

    bulkUpload(data: any) {
        let token = this.stateSvc.getUserData('accessToken');

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.url + '/student/upload', data, { headers })
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
