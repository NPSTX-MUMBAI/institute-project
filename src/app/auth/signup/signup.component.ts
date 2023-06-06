import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { InstituteService } from '../../services/institute.service';
import { BankService } from '../../services/bank.service';

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

    constructor(
        private auth: AuthService,
        private msg: MessageService,
        private stateSvc: StateService,
        private router: Router,
        private instSvc: InstituteService,
        private bankSvc: BankService
    ) {}

    ngOnInit(): void {
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
    }

    async onSavePersonalInfo(event: any) {
        console.log(event, 'child event 1');

        this.auth.createUser(event).then((res: any) => {
            if (res.status) {
                this.stateSvc.setUserData('userMobile', event.mobileNo);

                this.msg.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'user created successfully',
                });

                setTimeout(() => {
                    this.router.navigate(['auth/otp']);
                }, 500);
            } else {
                this.msg.add({
                    severity: 'warn',
                    summary: 'warn',
                    detail: 'user already exists',
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
}
