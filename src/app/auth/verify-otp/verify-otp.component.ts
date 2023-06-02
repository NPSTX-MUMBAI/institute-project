import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { KycService } from '../../services/kyc.service';
import { OtpService } from '../../services/otp.service';
import { MessageService } from 'primeng/api';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verify-otp',
    templateUrl: './verify-otp.component.html',
    styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
    userMobileNo: any;

    otpGrp!: FormGroup;
    OTP: any;

    constructor(
        private stateSvc: StateService,
        private otpSvc: OtpService,
        private msg: MessageService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.otpGrp = this.fb.group({
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
        });

        this.userMobileNo = this.stateSvc.getUserMobileNo();
        console.log(this.userMobileNo);
    }

    async sendOtp() {
        console.log(this.otpGrp.value);
        let otpData = this.otpGrp.value;
        let myOtp = otpData.otp1 + otpData.otp2 + otpData.otp3 + otpData.otp4;

        console.log(myOtp);
        this.OTP = myOtp;
        let data = {
            mobileNo: this.userMobileNo,
            otp: this.OTP,
        };

        try {
            const res: any = await this.otpSvc.verifyOtp(data);
            if (res.status) {
                this.stateSvc.setUserId(res.data);
                this.msg.add({
                    severity: 'success',
                    summary: 'Created',
                    detail: 'otp verified',
                });

                this.router.navigate(['auth/signup']);
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

    async submit() {}
}
