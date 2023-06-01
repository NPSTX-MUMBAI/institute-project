import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StateService } from '../../../services/state.service';
@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
    personalGrp!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private messageService: MessageService,
        private stateSvc: StateService
    ) {}

    ngOnInit(): void {
        this.personalGrp = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
            mobileNo: [
                '',
                [Validators.required, Validators.pattern('^[0-9]*$')],
            ],
            password: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                    ),
                    Validators.minLength(8),
                ]),
            ],
            confirmPassword: [null, [Validators.required]],

            userType: ['ADMIN'],
        });
        const confirmPasswordControl = this.personalGrp.get('confirmPassword');
        if (confirmPasswordControl !== null) {
            confirmPasswordControl.setValidators([
                Validators.required,
                this.passwordMatchValidator.bind(this),
            ]);
        }
    }

    passwordMatchValidator(frm: FormGroup) {
        const password = this.personalGrp.get('password')?.value;
        const confirmPassword = frm.value;
        return password === confirmPassword
            ? null
            : { passwordsNotMatched: true };
    }

    onSave() {
        try {
            if (this.personalGrp.invalid) {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'invalid',
                    detail: 'Details incorrect',
                });
            } else {
                let user: any = this.personalGrp.value;
                delete user.confirmPassword;

                this.auth
                    .createUser(this.personalGrp.value)
                    .then((res: any) => {
                        if (res.status) {
                            this.stateSvc.setUserMobileNo(user.mobileNo);

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
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'user created successfully',
                });
            }
        } catch (error) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'message',
            });
        }
        console.log(this.personalGrp.value);
    }
}
