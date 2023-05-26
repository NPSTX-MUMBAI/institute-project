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

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            rollNo: ['', Validators.required],
            gender: ['', Validators.required],
            email: ['', Validators.required],
            mobileNo: ['', Validators.required],
            board: ['', Validators.required],
            std: ['', Validators.required],
            div: ['', Validators.required],
            dob: ['', Validators.required],
            balance: ['', Validators.required],
        });
    }
    submit() {
        console.log(this.studentForm.value);
    }
}
