import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-staff-info',
    templateUrl: './staff-info.component.html',
    styleUrls: ['./staff-info.component.scss'],
})
export class StaffInfoComponent implements OnInit {
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
