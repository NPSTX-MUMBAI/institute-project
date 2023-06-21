import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent {
    students: any = [];
    schoolId: any;
    selectedSchool: any;
    constructor(
        private router: Router,
        private studSvc: StudentService,
        private stateSvc: StateService
    ) {}
    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        if (!this.schoolId) {
            this.router.navigate(['/']);

            return;
        }

        this.getAllStudents();
    }

    async getAllStudents() {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        try {
            const res: any = await this.studSvc.getStudents(this.schoolId);
            console.log(res);
            this.students = res.data;
        } catch (error) {
            console.error(error);
        }
    }

    addStudent() {
        this.router.navigate(['/main/student/add-student']);
    }

    bulkUpload() {
        this.router.navigate(['/main/student/bulkUpload']);
    }
}
