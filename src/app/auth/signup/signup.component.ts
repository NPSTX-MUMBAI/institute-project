import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { InstituteService } from '../../services/institute.service';
import { BankService } from '../../services/bank.service';
import { HttpClient } from '@angular/common/http';
import { KycService } from '../../services/kyc.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
    activeIndex: number = 0;
    userData: any;
    personalInfoComplete: boolean = false;
    instituteInfoComplete: boolean = false;
    bankInfoComplete: boolean = false;
    kycInfoComplete: boolean = false;
    internetStatus: any;
    uploadAadhaar = false;
    uploadPAN = false;
    uploadGST = false;
    uploadREG = false;

    constructor(
        private auth: AuthService,
        private msg: MessageService,
        private stateSvc: StateService,
        private router: Router,
        private instSvc: InstituteService,
        private bankSvc: BankService,
        private http: HttpClient,
        private kycSvc: KycService
    ) {}

    ngOnInit(): void {
        this.checkInternetConnection();

        if (this.stateSvc.getUserData('userId')) {
            this.activeIndex = 1;
            this.personalInfoComplete = true;
        }
        if (this.stateSvc.getUserData('schoolId')) {
            this.activeIndex = 2;
            this.instituteInfoComplete = true;
        }
        if (this.stateSvc.getUserData('ifsc')) {
            this.activeIndex = 3;
            this.bankInfoComplete = true;
        }
        if (this.stateSvc.getUserData('PAN')) {
            this.activeIndex = 4;
            this.kycInfoComplete = true;
        }
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
                    this.msg.add({
                        severity: 'warn',
                        // summary: 'warn',
                        detail: 'Check internet connection',
                    });
                } else {
                    console.log('working');
                }
            }
        );
    }
    async onSavePersonalInfo(event: any) {
        console.log(event, 'child event 1');

        this.auth.createUser(event).then((res: any) => {
            if (res.status) {
                this.stateSvc.setUserData('userMobile', event.mobileNo);

                this.msg.add({
                    severity: 'success',
                    detail: 'OTP sent!',
                });

                setTimeout(() => {
                    this.router.navigate(['auth/otp']);
                }, 500);
            } else {
                this.msg.add({
                    severity: 'warn',
                    detail: 'User already exists',
                });
            }
        });
    }

    async onSaveInstInfo(event: any) {
        console.log(event, 'child event 2');
        let instituteInfoObj = event;

        try {
            const res: any = await this.instSvc.createInstitute(
                instituteInfoObj
            );
            if (res.status) {
                this.msg.add({
                    severity: 'success',
                    summary: 'Created',
                    detail: 'Institute created successfully',
                });

                this.stateSvc.setUserData('schoolId', res.data.schoolId);
                this.activeIndex++;
            } else {
                this.msg.add({
                    severity: 'warn',
                    detail: 'Please make sure your Phone number, Email id ,Website are unique ',
                });
            }
            console.log(res);
        } catch (error) {
            this.msg.add({
                severity: 'warn',
                summary: 'error',
                detail: 'Something went wrong',
            });

            console.error(error);
        }
    }

    async onSaveBankInfo(event: any) {
        console.log(event, 'child event 3');

        try {
            const res: any = await this.bankSvc.createBank(event);
            if (res.status) {
                this.msg.add({
                    severity: 'success',
                    summary: 'Created',
                    detail: 'Bank created successfully',
                });
                this.stateSvc.setUserData('ifsc', res.data.ifsc);

                this.activeIndex++;
            } else {
                this.msg.add({
                    severity: 'warn',
                    summary: 'error',
                    detail: 'Something went wrong',
                });
            }
            console.log(res);
        } catch (error) {
            this.msg.add({
                severity: 'warn',
                summary: 'error',
                detail: 'Something went wrong',
            });
            console.error(error);
        }
    }

    async KycUploadfn(event: any) {
        console.log(event);
        console.log(event.type);
        console.log(event.value);

        this.kycSvc.uploadKyc(event.data).then((res: any) => {
            if (res.status) {
                this.msg.add({
                    severity: 'success',
                    detail: `${event.type}  uploaded successfully!`,
                });

                if (event.type === 'ADHARCARD') {
                    this.uploadAadhaar = true;
                    this.stateSvc.setUserData('PAN', event.number);
                }
                if (event.type === 'PANCARD') {
                    this.uploadPAN = true;
                }
                if (event.type === 'GST') {
                    this.uploadGST = true;
                }
                if (event.type === 'REG') {
                    this.uploadREG = true;
                }

                if (
                    this.uploadAadhaar &&
                    this.uploadPAN &&
                    this.uploadGST &&
                    this.uploadREG
                ) {
                    this.activeIndex++;
                }
            }
        });
    }
}
