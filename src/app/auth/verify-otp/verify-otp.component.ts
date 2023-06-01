import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { KycService } from '../../services/kyc.service';
import { OtpService } from '../../services/otp.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-verify-otp',
    templateUrl: './verify-otp.component.html',
    styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
    userMobileNo: any;

    constructor(
        private stateSvc: StateService,
        private otpSvc: OtpService,
        private msg: MessageService
    ) {}

    ngOnInit(): void {
        this.userMobileNo = this.stateSvc.getUserMobileNo();
        console.log(this.userMobileNo);
    }

    async submit() {
        let data: any;
        this.otpSvc.verifyOtp(data).then((res: any) => {});

        try {
            const res: any = await this.otpSvc.verifyOtp(data);
            if (res.status) {
                this.stateSvc.setUserData('userId', res.data);
                this.msg.add({
                    severity: 'success',
                    summary: 'Created',
                    detail: 'otp verified',
                });
                // this.loading = false;
            } else {
                this.msg.add({
                    severity: 'warn',
                    summary: 'error',
                    detail: 'Something went wrong',
                });
                // this.loading = false;
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
