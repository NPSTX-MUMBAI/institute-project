import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    slicedMobileNo: any;
    minutes!: number;
    second!: number;
    visible!: boolean;
    mobileNo: string = '7738195474';
    timeerVissible!: boolean;
    otp: string[] = ['', '', '', ''];
    errorArray: boolean[] = [false, false, false, false];
    @Output() onOtpChange = new EventEmitter<string>();

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

        this.userMobileNo = this.stateSvc.getUserData('userMobile');

        this.slicedMobileNo = this.userMobileNo.slice(-4);
        console.log(this.userMobileNo);
        // this.minutes = 1;
        // this.second = 15;
        this.visible = false;
        this.timeerVissible = true;

        this.startTimer1();
        this.startTimer2();
    }

    async verifyOTP() {
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
                this.stateSvc.setUserData('userId', res.data);
                this.msg.add({
                    severity: 'success',
                    detail: 'Otp verified',
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
    onKeyUp(index: number) {
        if (index === 3) {
            let otp =
                this.otpGrp.controls['otp1'].value +
                this.otpGrp.controls['otp2'].value +
                this.otpGrp.controls['otp3'].value +
                this.otpGrp.controls['otp4'].value;
            console.log(otp);
        }
    }

    eventHandler(event: any, index: number) {
        if (event.inputType == 'insertText') {
            const value = event.target.value;
            if (!isNaN(value)) {
                console.log(value);
                this.otp[index] = value;
                this.errorArray[index] = false;
                this.onOtpChange.emit(this.otp.join(''));
                if (value.length > 0 && index < 3) {
                    const nextInput = event.target.nextElementSibling;
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            } else {
                event.target.value = '';
                this.otp[index] = '';
                this.errorArray[index] = true;
                this.onOtpChange.emit('');
            }
        }
        if (event.inputType == 'deleteContentBackward') {
            const PrevInput = event.target.previousElementSibling;
            if (PrevInput) {
                PrevInput.focus();
            }
        }
    }
    // startTimer1() {
    //     setInterval(() => {
    //         if (this.second > 0) {
    //             this.second--;
    //         } else {
    //             this.second = 59;
    //         }
    //     }, 1000);
    // }

    // startTimer2() {
    //     setInterval(() => {
    //         if (this.minutes > 0) {
    //             this.minutes--;
    //         } else {
    //             // Add any necessary logic when the minutes reach 0
    //         }
    //     }, 1000 * 59);
    // }
    async resendOTP() {
        console.log('!!!!!!!!!!');

        try {
            const data = {
                mobileNo: this.mobileNo, // Assuming you have the user's mobile number
            };

            const res: any = await this.otpSvc.timer(data); // Call the resend OTP service method

            if (res.status) {
                this.msg.add({
                    severity: 'success',
                    detail: 'OTP resent',
                });
            } else {
                this.msg.add({
                    severity: 'warn',
                    summary: 'Error',
                    detail: 'Something went wrong while resending OTP',
                });
            }

            console.log(res);
        } catch (error) {
            this.msg.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'Something went wrong while resending OTP',
            });
            console.error(error);
        }
    }

    startTimer1() {
        setInterval(() => {
            if (this.second > 0) {
                this.second--;
            } else {
                this.second = 10;
            }
        }, 1000);
    }

    startTimer2() {
        setInterval(() => {
            if (this.minutes > 0) {
                this.minutes--;
            } else {
                if (this.minutes > 0) {
                    this.minutes--;
                } else {
                    this.timeerVissible = false;
                    this.visible = true;
                }
            }
        }, 1000 * 10);
    }
}
