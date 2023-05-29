import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { UiModule } from '../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { BankInfoComponent } from './signup/bank-info/bank-info.component';
import { InstituteInfoComponent } from './signup/institute-info/institute-info.component';
import { KycInfoComponent } from './signup/kyc-info/kyc-info.component';
import { StaffInfoComponent } from './signup/staff-info/staff-info.component';
import { PersonalInfoComponent } from './signup/personal-info/personal-info.component';
import { StatusComponent } from './signup/status/status.component';
import { OtpComponent } from './signup/otp/otp.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-otp', component: VerifyOtpComponent },
    { path: 'new-password', component: NewPasswordComponent },
    { path: 'otp', component: VerifyOtpComponent },
    { path: 'signup', component: SignupComponent },
];

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ForgotPasswordComponent,
        NewPasswordComponent,
        VerifyOtpComponent,
        BankInfoComponent,
        InstituteInfoComponent,
        KycInfoComponent,
        StaffInfoComponent,
        PersonalInfoComponent,
        StatusComponent,
        OtpComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UiModule,
        ReactiveFormsModule,
    ],
})
export class AuthModule {}
