import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';
import {
    catchError,
    debounceTime,
    map,
    retry,
    tap,
    timeout,
} from 'rxjs/operators';
import { throwError } from 'rxjs';

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
        return this.http
            .post(
                environment.url + '/student/getAll/school/student',
                { schoolId: schoolId },
                { headers }
            )
            .pipe(
                tap((response: any) => {
                    console.log('Received students:', response);
                }),
                map((response: any) => {
                    return response.data;
                }),
                timeout(3000), // Set a timeout of 3 seconds for the request, after given time, error fn in initialised
                retry(3), // Retry the request up to 3 times in case of an error
                debounceTime(3000), // Wait for 3 seconds of inactivity before emitting the latest value

                catchError((error) => {
                    console.error('Error fetching students:', error);
                    return throwError(
                        'An error occurred while fetching students.'
                    );
                })
            );
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
