import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from '../../services/otp.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../../services/state.service';

import {
    FormControl,
    FormGroup,
    Validators,
    FormBuilder,
} from '@angular/forms';
import { log } from 'console';
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    isOtpValid() {
        throw new Error('Method not implemented.');
    }
    invalidOtp: boolean = true;

    value!: string;
    inputDigitLeft!: string;
    resetForm!: FormGroup;
    resetPasswordform!: FormGroup;
    visible: boolean = false;
    otp: any;
    hideButton: boolean = true;
    resetPassword: boolean = true;
    visibleSubmit: boolean = false;
    resetPassword2: boolean = false;
    otpFilled: boolean = false;
    mobileNo: string = '7738195474';
    enteredOTP!: string;
    OTP: any;
    userMobileNo: any;
    disableButton: boolean = true;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private stateSvc: StateService,
        private otpSvc: OtpService,
        private msg: MessageService
    ) {
        this.resetForm = this.fb.group({
            phone: ['', Validators.required],
        });
        this.resetPasswordform = this.fb.group({
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
        });
    }
    ngOnInit(): void {}
    // async submit() {
    //     // this.router.navigate(['auth/otp']);
    //     console.log(this.resetForm.value);

    //     this.visible = true;
    //     this.visibleSubmit = true;
    //     this.hideButton = false;
    //     try {
    //         const data = {
    //             mobileNo: this.mobileNo,
    //         };
    //         const res: any = await this.otpSvc.timer(data);
    //         if (res.status) {
    //             this.msg.add({
    //                 severity: 'success',
    //                 detail: 'OTP sent',
    //             });
    //         } else {
    //             this.msg.add({
    //                 severity: 'warn',
    //                 summary: 'Error',
    //                 detail: 'Something went wrong while resending OTP',
    //             });
    //         }
    //         console.log(res);
    //     } catch (error) {
    //         this.msg.add({
    //             severity: 'warn',
    //             summary: 'Error',
    //             detail: 'Something went wrong while resending OTP',
    //         });
    //         console.error(error);
    //     }
    // }
    async submit() {
        // Get the value entered by the user in the input field
        const mobileNo = this.resetForm.value.phone;

        // Check if the mobile number is valid
        if (mobileNo && this.resetForm.controls['phone'].valid) {
            console.log(this.resetForm.value);
            try {
                const data = {
                    mobileNo: mobileNo, // Use the user-entered mobile number here
                };
                const res: any = await this.otpSvc.timer(data);
                if (res.status) {
                    console.log(res), 'oieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

                    this.msg.add({
                        severity: 'success',
                        detail: 'OTP sent',
                    });
                    this.visible = true;
                    this.hideButton = false;
                    this.visibleSubmit = true;
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
        } else {
            this.msg.add({
                severity: 'warn',
                detail: 'Please enter a valid mobile number',
            });
        }
    }
    async sendOtp() {
        console.log(this.otp, 'shivaniiiiiiiiiiii');
        // this.resetPassword = false;
        this.enteredOTP = this.otp;
        // this.resetPassword2 = true;

        this.OTP = this.otp;
        let data = {
            mobileNo: this.resetForm.value.phone,
            otp: this.enteredOTP,
        };

        try {
            const res: any = await this.otpSvc.verifyOtp(data);
            if (res.status) {
                this.stateSvc.setUserData('userId', res.data);

                this.msg.add({
                    severity: 'success',
                    detail: 'Otp verified',
                });
                this.resetPassword2 = true;
                this.resetPassword = false;
            } else {
                this.otpFilled = false;
                this.msg.add({
                    severity: 'warn',
                    summary: 'error',
                    detail: 'Invalid Otp',
                });
                this.resetPassword2 = false;
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
    async sendPassword() {
        let newPassword = this.resetPasswordform.controls['password'].value;
        let confirmPassword =
            this.resetPasswordform.controls['confirmPassword'].value;

        this.resetPassword = false;
        this.resetPassword2 = true;
        console.log(this.resetPasswordform.value);
        if (newPassword === confirmPassword) {
            console.log('Password Reset');
            //new fn from service
            try {
                const data = {
                    mobileNo: this.resetForm.value.phone,

                    password: confirmPassword, // Use the user-entered mobile number here
                };
                console.log(data, '_____________________');

                const res: any = await this.otpSvc.resetPassword(data);
                if (res.status) {
                    this.msg.add({
                        severity: 'success',
                        detail: 'password reset sucessfully ',
                    });
                }
            } catch (error) {
                this.msg.add({
                    severity: 'warn',
                    summary: 'Error',
                    detail: 'Something went wrong while resending OTP',
                });
                console.error(error);
            }
        } else {
            this.resetPassword = false;

            this.msg.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'password n confirm password not matched',
            });
        }
        //  else {
        //     console.log('Please try again');
        //     //notify msg to show not match
        // }
    }

    public configOptions = {
        length: 4,

        allowNumbersOnly: true,

        isPasswordInput: false,

        disableAutoFocus: false,

        placeholder: '',

        inputStyles: {
            display: 'flex',

            outline: 'none',

            border: '2px solid #89B4FA',
        },

        containerStyles: {
            display: 'flex',
        },

        inputClass: 'each_input',

        containerClass: 'all_inputs',
    };
    OtpChange(event: any) {
        this.otp = event;
        this.otpFilled = event.length === this.configOptions.length;

        if (this.otp.length < this.configOptions.length) {
            this.inputDigitLeft =
                this.configOptions.length - this.otp.length + ' digits Left';
        }

        if (this.otp.length === this.configOptions.length) {
            this.inputDigitLeft = "Let's go!";
        }
    }
}
