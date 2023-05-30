import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginGrp!: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authSvc: AuthService,
        private msgSvc: MessageService,
        private stateSvc: StateService
    ) {}

    ngOnInit(): void {
        this.loginGrp = this.fb.group({
            mobileNo: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    route() {
        this.router.navigate(['auth/signup']);
        localStorage.clear();
    }

    signin() {
        console.log(this.loginGrp.value);
        if (this.loginGrp.invalid) {
            this.msgSvc.add({
                severity: 'error',
                summary: 'incorrect data',
                detail: 'Enter proper email and password',
            });
        } else {
            this.authSvc.login(this.loginGrp.value).then((res: any) => {
                console.log(res);

                if (res.status) {
                    console.log(res.user);

                    if (res.user.userType === 'ADMIN') {
                        this.msgSvc.add({
                            severity: 'info',
                            summary: 'Success',
                            detail: `Welcome ${res.user.firstName}`,
                        });

                        this.stateSvc.setUserData(
                            'accessToken',
                            res.token.accessToken
                        );
                        this.stateSvc.setUserData(
                            'refreshToken',
                            res.token.refreshToken
                        );
                        this.stateSvc.setUserData('userId', res.user.userId);
                        this.stateSvc.setUserData('user', res.user);

                        this.router.navigate(['/admin-dashboard']);
                    }
                } else {
                    this.msgSvc.add({
                        severity: 'error',
                        summary: 'Invalid Credentials',
                        detail: 'Invalid Credentials or you have not been registered',
                    });
                }
            });
        }
    }

    // login() {
    //     if (this.loginForm.invalid) {
    //       this.messageService.showError("Enter Mobile Number And Password")
    //     }
    //     else {
    //       this.authService.loginUser(this.loginForm.value).then((res: any) => {
    //         console.log(res)
    //         if (res.data.userType == USER_TYPE.CUSTOMER) {
    //           this.authService.setUserData("user", res.data)
    //           this.authService.setUserData("accessToken", res.tokens.accessToken)
    //           this.authService.setUserData("refreshToken", res.tokens.refreshToken)
    //           this.router.navigate(['/dashboard/customer-dashboard'])
    //           return
    //         }
    //         else if (res.data.isRegistrationComplete && res.data.isApproved) {
    //           this.authService.setUserData("user", res.data)
    //           this.authService.setUserData("accessToken", res.tokens.accessToken)
    //           this.authService.setUserData("refreshToken", res.tokens.refreshToken)
    //           this.router.navigate(['/dashboard/merchant-dashboard'])
    //           return
    //         } else {
    //           if (res.data.isRegistrationComplete && !res.data.isApproved) {
    //             let userData = { userId: res.data.userId, businessId: res.data.businessId, businessBankId: res.data.businessBankId, businessKycId: res.data.businessKycId }
    //             this.authService.setUserData('user', userData)
    //             this.router.navigate(['/auth/signup'])
    //             return
    //           } else if (!res.data.isRegistrationComplete) {
    //             let userId = { userId: res.data.userId }
    //             this.authService.setUserData('user', userId)
    //             if (!res.data.businessId) {
    //               this.messageService.showInfo(res.msg)
    //               this.router.navigate(['/auth/signup'])
    //               return
    //             }
    //             let userData = this.authService.getUserData('user')
    //             let businessId = { ...userData, businessId: res.data.businessId }
    //             this.authService.setUserData('user', businessId)
    //             if (!res.data.businessBankId) {
    //               this.messageService.showInfo(res.msg)
    //               this.router.navigate(['/auth/signup'])
    //               return
    //             }
    //             userData = this.authService.getUserData('user')
    //             let bankId = { ...userData, businessBankId: res.data.businessBankId }
    //             this.authService.setUserData('user', bankId)
    //             if (res.data.businessKycId.length != 3) {
    //               this.messageService.showInfo(res.msg)
    //               this.router.navigate(['/auth/signup'])
    //               return
    //             }

    //           }

    //         }

    //         // else {
    //         //   if (res.data.isRegistrationComplete && res.data.isApproved) {
    //         //     this.authService.setUserData("user" , res.data)
    //         //     this.authService.setUserData("accessToken", res.tokens.accessToken)
    //         //     this.authService.setUserData("refreshToken", res.tokens.refreshToken)
    //         //     this.authService.setUserData("userId", res.data.userId)
    //         //     this.authService.setUserData("businessId", res.data.businessId)
    //         //     this.authService.setUserData("bankId", res.data.businessBankId)
    //         //     this.authService.setUserData("kycId", res.data.businessKycId[0].kycId)
    //         //     this.authService.setUserData("usertype", res.data.userType)
    //         //     this.router.navigate(['/dashboard/merchant-dashboard'])
    //         //     return
    //         //   }
    //         //   if (!res.data.isApproved) {
    //         //     this.authService.setUserData("user" , res.data)
    //         //     this.authService.setUserData("businessId", res.data.businessId)
    //         //     this.authService.setUserData("userId", res.data.userId)
    //         //     this.authService.setUserData("bankId", res.data.businessBankId)
    //         //     if (res.data.businessKycId.length != 0) {
    //         //       this.authService.setUserData("kycId", res.data.businessKycId[0].kycId)
    //         //     }
    //         //     this.router.navigate(['/auth/signup/status'])
    //         //     return
    //         //   }
    //         // }

    //       }).catch((err) => {
    //         console.log(err);
    //         this.messageService.showError(err.msg)
    //       })

    //     }

    //   }
}
