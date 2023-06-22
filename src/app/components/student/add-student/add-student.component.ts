import { Component, OnInit } from '@angular/core';
import { InstituteService } from '../../../services/institute.service';
import { StateService } from '../../../services/state.service';
import { StudentService } from '../../../services/student.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    studentId: any;
    uniqueId: any;
    constructor(
        private fb: FormBuilder,
        private instSvc: InstituteService,
        private stateSvc: StateService,
        private studSvc: StudentService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');
        this.studentId = this.route.snapshot.queryParamMap.get('studentId');

        this.getInstitueDetails();
        this.getAllStd();

        if (this.studentId) {
            this.getStudentDetails();
        }
        this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            studentUniqueId: ['', Validators.required],
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

    async getStudentDetails() {
        let data = {
            schoolId: this.schoolId,
            studentId: this.studentId,
        };
        await this.studSvc.getStudentDetails(data).then((res: any) => {
            console.log(res.data[0]);
            let myStudent = res.data[0];
            let i = this.standard.findIndex(
                (std) => std.name === myStudent.std
            );
            let matchedStandard = this.standard[i].name;
            console.log(matchedStandard);

            // [I,II,III]
            //from db-> std: 'I'
            // [{name: 'I', standardId: '23786327894', name: 'II', }]
            setTimeout(() => {
                this.studentForm = this.fb.group({
                    firstName: [myStudent.firstName, Validators.required],
                    lastName: [myStudent.lastName, Validators.required],
                    studentUniqueId: [myStudent.uniqueId, Validators.required],
                    rollNo: [myStudent.rollNo, Validators.required],
                    gender: [myStudent.gender, Validators.required],
                    email: [myStudent.email, Validators.required],
                    mobileNo: [myStudent.mobileNo, Validators.required],
                    board: [myStudent.board, Validators.required],
                    std: [this.standard[i], Validators.required],
                    div: [myStudent.div, Validators.required],
                    dob: [myStudent.dob, Validators.required],
                    balance: [myStudent.balance, Validators.required],
                    line1: [myStudent.line1, Validators.required],
                    line2: [myStudent.line2, Validators.required],
                    landmark: [myStudent.landmark, Validators.required],
                    zip: [myStudent.zip, Validators.required],
                    country: [myStudent.country, Validators.required],
                    state: [myStudent.state, Validators.required],
                    city: [myStudent.city, Validators.required],
                    locality: [myStudent.locality, Validators.required],
                    fatherFirstName: [myStudent.fatherFirstName],
                    fatherLastName: [myStudent.fatherLastName],
                    fatherEmail: [myStudent.fatherEmail],
                    fatherMobile: [myStudent.fatherPhone],
                    motherFirstName: [myStudent.motherFirstName],
                    motherLastName: [myStudent.motherLastName],
                    motherEmail: [myStudent.motherEmail],
                    motherMobile: [myStudent.motherPhone],
                    guardianFirstName: [myStudent.guardianFirstName],
                    guardianLastName: [myStudent.guardianLastName],
                    guardianEmail: [myStudent.guardianEmail],
                    guardianMobile: [myStudent.guardianPhone],
                });
            }, 2000);
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
            console.log(this.standard, 'shivaniiiiiiiiiiiiiiiiiiii');

            console.log(this.standard[10]);
        });
    }

    async getInstitueDetails() {
        await this.instSvc
            .getInstituteDetails(this.schoolId)
            .then((res: any) => {
                console.log(res.data.board[0]);
                this.boards.push({ name: res.data.board[0].boardType });

                this.uniqueId = res.data.school.uniqueId;
            });
    }
    async submit() {
        let studentFormValue = this.studentForm.value;

        console.log(studentFormValue);

        let divId = studentFormValue.div.divisionId;

        let stdId = studentFormValue.std.standardId;
        let boardType = studentFormValue.board.name;
        studentFormValue.div = studentFormValue.div.div;
        studentFormValue.std = studentFormValue.std.name;
        delete studentFormValue.board;
        studentFormValue.standardId = stdId;
        studentFormValue.divisionId = divId;
        studentFormValue.boardType = boardType;
        studentFormValue.schoolId = this.schoolId;
        studentFormValue.uniqueId = this.uniqueId;

        console.log(studentFormValue);

        await this.studSvc.createStudent(studentFormValue).then((res: any) => {
            console.log(res);
        });
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
            console.log(this.division, 'helloooooooooooooooooooooo');
        });
    }
}
