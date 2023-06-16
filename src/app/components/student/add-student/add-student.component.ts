import { Component, OnInit } from '@angular/core';
import { InstituteService } from '../../../services/institute.service';
import { StateService } from '../../../services/state.service';
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
    boards: any[] = [];
    standard: any[] = [];
    division: any[] = [];
    stds = [];

    schoolId: any;
    constructor(
        private fb: FormBuilder,
        private instSvc: InstituteService,
        private stateSvc: StateService
    ) {}

    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');
        this.getInstitueDetails();
        this.getAllStd();
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
            fatherFirstName: [''],
            fatherLastName: [''],
            fatherEmail: [''],
            fatherMobile: [''],
            motherFirstName: [''],
            motherLastName: [''],
            motherEmail: [''],
            motherMobile: [''],
            guardianFirstName: [''],
            guardianLastName: [''],
            guardianEmail: [''],
            guardianMobile: [''],
        });
    }

    async getAllStd() {
        let tempStdArr: any[] = [];
        await this.instSvc.getAllStds(this.schoolId).then((res: any) => {
            for (let i of res.data) {
                console.log(i);
                tempStdArr.push({ name: i.std, standardId: i.standardId });
            }
            this.standard = tempStdArr;
        });
    }

    async getInstitueDetails() {
        await this.instSvc
            .getInstituteDetails(this.schoolId)
            .then((res: any) => {
                console.log(res.data.board[0]);
                this.boards.push({ name: res.data.board[0].boardType });
            });
    }
    submit() {
        let studentFormValue = this.studentForm.value;

        let divId = studentFormValue.div.divisionId;

        let stdId = studentFormValue.std.standardId;
        let boardType = studentFormValue.board.name;
        delete studentFormValue.div;
        delete studentFormValue.std;
        delete studentFormValue.board;
        studentFormValue.standardId = stdId;
        studentFormValue.divisionId = divId;
        studentFormValue.boardType = boardType;
        console.log(studentFormValue);
    }
    async setStd(event: any) {
        let tempDivArr: any[] = [];
        console.log(event);

        await this.instSvc.getAllDivs(event.standardId).then((res: any) => {
            for (let i of res.data) {
                console.log(i);
                tempDivArr.push({ div: i.div, divisionId: i.divisionId });
            }
            this.division = tempDivArr;
        });
    }
}
