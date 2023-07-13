import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-add-staff',
    templateUrl: './add-staff.component.html',
    styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
    staffDetails!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authSvc: AuthService,
        private stateSvc: StateService
    ) {}

    ngOnInit(): void {
        this.staffDetails = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            mobileNo: ['', Validators.required],
            password: ['', Validators.required],
            // pin: ['', Validators.required],
        });
    }
    submit() {
        let data: any = this.staffDetails.value;
        console.log(data);

        data.schoolId = this.stateSvc.getUserData('schoolId');
        data.userType = 'STAFF';

        this.authSvc.createStaff(data).then((res: any) => {
            console.log(res);
        });
    }
    navigateToRoute() {
        this.router.navigateByUrl('/main/institute/staff');
    }
}
