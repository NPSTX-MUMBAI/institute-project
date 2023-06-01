import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-verify-otp',
    templateUrl: './verify-otp.component.html',
    styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
    userMobileNo: any;

    constructor(private stateSvc: StateService) {}

    ngOnInit(): void {
        this.userMobileNo = this.stateSvc.getUserMobileNo();
        console.log(this.userMobileNo);
    }
}
