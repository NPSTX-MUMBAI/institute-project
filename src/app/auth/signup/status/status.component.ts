import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { StatusService } from 'src/app/services/status.service';
import { StateService } from 'src/app/services/state.service';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
    @Input() index: any;
    messages1!: Message[];

    messages2!: Message[];
    messages3!: Message[];

    instStatus = false;

    bankStatus = false;
    kycStatus = false;
    myUserId: any;
    mySchoolId: any;

    constructor(
        private router: Router,
        private statusSvc: StatusService,
        private stateSvc: StateService
    ) {}
    ngOnInit() {
        this.myUserId = this.stateSvc.getUserData('userId');
        this.mySchoolId = this.stateSvc.getUserData('schoolId');

        this.checkStatus()
    }

    checkStatus() {
        let data = {
            userId: this.myUserId,
            schoolId: this.mySchoolId,
        };
        this.statusSvc.schoolStatus(data).then((res: any) => {
            console.log(res);

            this.instStatus = res.schoolStatus;
            this.bankStatus = res.bankStatus;
            this.kycStatus =  (res.kycDone && res.kycDone.length === 4) ;

            console.log(this.instStatus, this.bankStatus, this.kycStatus);

            if (this.instStatus == true) {
                this.messages1 = [
                    {
                        severity: 'success',
                        detail: 'Personal Details',
                    },
                ];
            } else {
                this.messages1 = [
                    {
                        severity: 'warn',
                        detail: 'Personal Details',
                    },
                ];
            }

            if (this.bankStatus == true) {
                this.messages2 = [
                    {
                        severity: 'success',
                        detail: 'Bank Details',
                    },
                ];
            } else {
                this.messages2 = [
                    {
                        severity: 'warn',
                        detail: 'Bank Details',
                    },
                ];
            }
            if (this.kycStatus == true) {
                this.messages3 = [
                    {
                        severity: 'success',
                        detail: 'Kyc Details',
                    },
                ];
            } else {
                this.messages3 = [
                    {
                        severity: 'warn',
                        detail: 'Kyc Details',
                    },
                ];
            }
        });
    }

    route() {
        this.router.navigate(['auth/login']);
    }
}
