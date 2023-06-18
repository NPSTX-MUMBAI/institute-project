import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../../services/state.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginGrp!: FormGroup;
    loading = false;
    hidePassword = true;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authSvc: AuthService,
        private msgSvc: MessageService,
        private stateSvc: StateService,
        private location: Location
    ) {}

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    ngOnInit(): void {
        localStorage.clear();

        this.loginGrp = this.fb.group({
            mobileNo: ['8108587537', Validators.required],
            password: ['Shoaib@123', Validators.required],
        });
    }

    route() {
        this.router.navigate(['auth/signup']);
        localStorage.clear();
    }

    signin() {
        this.loading = true;
        console.log(this.loginGrp.value);
        if (this.loginGrp.invalid) {
            this.msgSvc.add({
                severity: 'error',
                summary: 'incorrect data',
                detail: 'Enter proper mobile No and password',
            });
            this.loading = false;
        } else {
            this.authSvc.login(this.loginGrp.value).then((res: any) => {
                if (res.status) {
                    let loggedInUser: any =
                        this.stateSvc.getUserData('newUser');
                    loggedInUser = JSON.parse(loggedInUser);
                    console.log(loggedInUser.firstName);

                    if (loggedInUser.userType === 'ADMIN') {
                        this.msgSvc.add({
                            severity: 'info',
                            summary: 'Success',
                            detail: `Welcome ${loggedInUser.firstName}`,
                        });

                        this.stateSvc.setUserData(
                            'accessToken',
                            res.token.accessToken
                        );
                        this.stateSvc.setUserData(
                            'refreshToken',
                            res.token.refreshToken
                        );
                        this.stateSvc.setUserData(
                            'userId',
                            loggedInUser.userId
                        );
                        this.stateSvc.setUserData('user', loggedInUser);
                        this.loading = false;
                        this.location.replaceState('/'); // to prevent going back to login

                        this.router.navigate(['/main/admin-dashboard']);
                    }
                } else {
                    this.msgSvc.add({
                        severity: 'error',
                        summary: 'Invalid Credentials',
                        detail: 'Invalid Credentials or you have not been registered',
                    });
                    this.loading = false;
                }
            });
        }
    }
}
