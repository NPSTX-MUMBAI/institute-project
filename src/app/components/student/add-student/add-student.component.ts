import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
    studentForm!: FormGroup;
    boards = [{ name: 'CBSE' }, { name: 'ICSE' }, { name: 'MSBSE' }];
    standard = [{ name: 'I' }, { name: 'II' }, { name: 'III' }];
    division = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            regId: ['', Validators.required],
            rollNo: ['', Validators.required],
            gender: ['', Validators.required],
            email: ['', Validators.required],
            mobileNo: ['', Validators.required],
            board: ['', Validators.required],
            std: ['', Validators.required],
            div: ['', Validators.required],
            dob: ['', Validators.required],
            balance: ['', Validators.required],
            line1: ['', Validators.required],
            line2: ['', Validators.required],
            landmark: ['', Validators.required],
            zip: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            locality: ['', Validators.required],
            fatherFirstName: ['', Validators.required],
            fatherLastName: ['', Validators.required],
            fatherEmail: ['', Validators.required],
            fatherMobile: ['', Validators.required],
            motherFirstName: ['', Validators.required],
            motherLastName: ['', Validators.required],
            motherEmail: ['', Validators.required],
            motherMobile: ['', Validators.required],
            guardianFirstName: ['', Validators.required],
            guardianLastName: ['', Validators.required],
            guardianEmail: ['', Validators.required],
            guardianMobile: ['', Validators.required],
        });
    }
    submit() {
        console.log(this.studentForm.value);
    }
}
