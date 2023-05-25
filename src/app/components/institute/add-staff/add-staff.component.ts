import { Component, OnInit } from '@angular/core';
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

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.staffDetails = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            mobileNo: ['', Validators.required],
            password: ['', Validators.required],
            pin: ['', Validators.required],
        });
    }
    submit() {
        console.log(this.staffDetails.value);
    }
}
