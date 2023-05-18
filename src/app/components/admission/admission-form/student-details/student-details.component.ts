import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AdmissionService } from 'src/app/services/admission.service';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
    value5: any;

    studentDetails!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private admissionSrv: AdmissionService
    ) {}
    ngOnInit(): void {
        this.studentDetails = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            nationality: ['', [Validators.required]],
            religion: ['', [Validators.required]],
            birthPlace: ['', [Validators.required]],
            state: ['', [Validators.required]],
            Std: ['', [Validators.required]],
            gender: ['', [Validators.required]],
        });
    }
    submit() {
        console.log(this.studentDetails.value);

        this.admissionSrv.saveStudentDetails(this.studentDetails.value);
    }
}
