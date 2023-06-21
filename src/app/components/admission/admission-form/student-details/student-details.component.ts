import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { error, log } from 'console';
import { MessageService } from 'primeng/api';
import { StudentDetails } from 'src/app/models/admission.model';
import { AdmissionService } from 'src/app/services/admission.service';
import { StateService } from 'src/app/services/state.service';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
    value5: any;
    selectedState: any = null;

    studentDetails!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private admissionSrv: AdmissionService,
        private stateSrv: StateService,
        private msg: MessageService
    ) {}

    ngOnInit(): void {
        this.studentDetails = this.fb.group({
            studentFirstName: ['', Validators.required],
            studentLastName: ['', Validators.required],
            studentEmail: ['', Validators.required],
            studentPhone: ['', Validators.required],
            studentAddress: ['', Validators.required],
            studentDateOfBirth: ['', Validators.required],
            studentNationality: ['', Validators.required],
            studentReligion: ['', Validators.required],
            studentPlaceOfBirth: ['', Validators.required],
            studentStateOfOrigin: ['', Validators.required],
            studentClass: ['', Validators.required],
            studentGender: ['Male', Validators.required],
            studentPreviousSchool: ['', Validators.required],
            studentPreviousClass: ['', Validators.required],
            studentPreviousClassAverage: ['', Validators.required],
        });
    }

    submit() {
        if (this.studentDetails.invalid) {
            this.msg.add({
                severity: 'error',
                summary: 'Invalid',
                detail: 'All fileds Required',
            });
            return;
        }
        console.log(this.studentDetails.value);
        const data = this.studentDetails.value;
        console.log(this.studentDetails);
        const studentDetailsObj: StudentDetails = {
            studentFirstName: data.studentFirstName,
            studentLastName: data.studentLastName,
            studentEmail: data.studentEmail,
            studentPhone: data.studentPhone,

            studentAddress: data.studentAddress,

            studentNationality: data.studentNationality,

            studentReligion: data.studentReligion,

            studentGender: data.studentGender,

            studentDateOfBirth: data.studentDateOfBirth,

            studentPlaceOfBirth: data.studentPlaceOfBirth,

            studentStateOfOrigin: data.studentStateOfOrigin,

            studentLGA: data.studentLGA,

            studentClass: data.studentClass,

            studentClassOfChoice: data.studentClassOfChoice,

            studentPreviousSchool: data.studentPreviousSchool,

            studentPreviousClass: data.studentPreviousClass,

            studentPreviousClassAverage: data.studentPreviousClassAverage,

            schoolId: data.schoolId,
        };
        this.admissionSrv
            .saveStudentDetails(studentDetailsObj)
            .then((res: any) => {
                console.log(res.data.applicationId);
                this.msg.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.msg,
                });
                this.stateSrv.applicationId = res.data.applicationId;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    dropdownItems = [
        { name: 'Male', code: 'Male' },
        { name: 'Female', code: 'Female' },
        { name: 'Transgender', code: 'Transgender' },
    ];
}
