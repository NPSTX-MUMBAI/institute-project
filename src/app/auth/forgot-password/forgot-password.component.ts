import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class ForgotPasswordComponent {
    value!: string;
    inputDigitLeft!: string;
    resetForm!: FormGroup;
    visible: boolean = false;
    otp: any;
    hideButton: boolean = true;
    resetPassword: boolean = true;
    visibleSubmit: boolean = false;
    resetPassword2: boolean = false;
    otpFilled: boolean = false;

    constructor(private router: Router, private fb: FormBuilder) {
        this.resetForm = this.fb.group({
            phone: ['', Validators.required],
            // password: new FormControl('', Validators.required),
            // confirmPassword: new FormControl('', Validators.required),
        });
    }

    submit() {
        // this.router.navigate(['auth/otp']);
        console.log(this.resetForm.value);
        this.visible = true;
        this.visibleSubmit = true;
        this.hideButton = false;
        // this.resetPassword = false;
        // this.resetPassword2 = true;
    }
    sendPassword() {
        this.resetPassword = false;
        this.resetPassword2 = true;
        console.log(this.resetForm.value);
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

        if (this.otp.length == this.configOptions.length) {
            this.inputDigitLeft = "Let's go!";
        }
    }
}
