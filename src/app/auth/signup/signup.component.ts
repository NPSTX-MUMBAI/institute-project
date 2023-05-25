import { Component } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
    activeIndex: number = 0;
    userData: any;
    personalInfoComplete: boolean = false;
    businessInfoComplete: boolean = false;
    bankInfoComplete: boolean = false;
    kycInfoComplete: boolean = false;
}
