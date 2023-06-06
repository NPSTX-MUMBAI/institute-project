import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
    activeIndex: number = 0;
    userData: any;
    personalInfoComplete: boolean = false;
    businessInfoComplete: boolean = false;
    bankInfoComplete: boolean = false;
    kycInfoComplete: boolean = false;
    internetStatus: any;

    constructor(
        private auth: AuthService,
        private messageService: MessageService,
        private stateSvc: StateService,
        private router: Router,
        private http: HttpClient
    ) {}
    ngOnInit(): void {
        this.checkInternetConnection();
    }
    checkInternetConnection() {
        const url = 'https://dns.google.com/resolve';
        this.http.get(url).subscribe(
            (e) => {
                setTimeout(() => {
                    alert('Hello...');
                }, 5000);
                console.log(e);
            },
            (error: any) => {
                this.internetStatus = error.status;
                console.log('error is', error.status);
                if (error.status == 0) {
                    this.messageService.add({
                        severity: 'warn',
                        // summary: 'warn',
                        detail: 'Check internet connection',
                    });
                } else {
                    console.log('shivaniiiiiiiiiiiiiiiiiiiiiiiiii');
                }
            }
        );
    }
    async onSavePersonalInfo(event: any) {
        console.log(event, 'child event 1');

        this.auth.createUser(event).then((res: any) => {
            if (res.status) {
                this.stateSvc.setUserData('userMobile', event.mobileNo);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'user created successfully',
                });

                setTimeout(() => {
                    this.router.navigate(['auth/otp']);
                }, 500);
            } else {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'warn',
                    detail: 'user already exists',
                });
            }
        });
    }

    async onSaveInstInfo(event: any) {
        console.log(event, 'child event 2');
    }

    async onSaveBankInfo(event: any) {
        console.log(event, 'child event 3');
    }
}
