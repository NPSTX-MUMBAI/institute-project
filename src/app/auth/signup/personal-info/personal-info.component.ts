import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StateService } from '../../../services/state.service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
    @Output() onSavePersonalInfo = new EventEmitter();

    personalGrp!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private messageService: MessageService,
        private stateSvc: StateService,
        private http: HttpClient
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
                    detail: 'Details incorrect',
                });
            } else {
                let user: any = this.personalGrp.value;
                delete user.confirmPassword;

                this.onSavePersonalInfo.emit(this.personalGrp.value);
            }
        } catch (error) {
            this.messageService.add({
                severity: 'warn',
                detail: 'Unknown error occurred',
            });
        }

        // console.log(this.personalGrp.value);
    }
}
