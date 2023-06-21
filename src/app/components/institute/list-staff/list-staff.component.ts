import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-list-staff',
    templateUrl: './list-staff.component.html',
    styleUrls: ['./list-staff.component.scss'],
})
export class ListStaffComponent implements OnInit {
    staff: any = [];
    schoolId: any;
    constructor(
        private router: Router,
        private authSvc: AuthService,
        private stateSvc: StateService
    ) {}

    // ngOnInit(): void {
    //     this.schoolId = this.stateSvc.getUserData('schoolId');

    //     this.getAllStaff();
    //     this.stateSvc.getData().subscribe((response: any) => {
    //         console.log('ins--->', response);
    //         this.getAllStaff();
    //     });
    // }
    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        this.stateSvc.getData().subscribe((response: any) => {
            if (this.schoolId) {
                this.getAllStaff();
            }
        });

        // Fetch initial bank and staff lists
        this.getAllStaff();
    }

    // async getAllStaff() {
    //     let data = {
    //         schoolId: this.schoolId,
    //         userType: 'STAFF',
    //     };
    //     await this.authSvc.getStaff(data).then((res: any) => {
    //         console.log(res);

    //         this.staff = res.data;
    //     });
    // }
    async getAllStaff() {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        let data = {
            schoolId: this.schoolId,
            userType: 'STAFF',
        };

        await this.authSvc.getStaff(data).then((res: any) => {
            console.log(res);
            this.staff = res.data;
        });
    }

    navigateToAddBank() {
        this.router.navigate(['/main/institute/staff/add']);
    }
}
