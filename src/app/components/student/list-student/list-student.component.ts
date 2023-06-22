import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListStudentComponent {
    students: any = [];
    schoolId: any;
    items: any;

    selectedSchool: any;
    constructor(
        private router: Router,
        private studSvc: StudentService,
        private stateSvc: StateService
    ) {}
    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        // if (!this.schoolId) {
        //     this.router.navigate(['/']);

        //     return;
        // }
        this.getAllStudents();

        this.stateSvc.getData().subscribe((response: any) => {
            console.log('ins--->', response);
            this.getAllStudents();
        });

        this.getAllStudents();
    }

    handleClick(id: any) {
        console.log(id);

        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                routerLink: ['/main/student/add-student'],
                queryParams: { studentId: id },
                queryParamsHandling: 'merge',
            },

            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {},
            },
        ];
    }

    async getAllStudents() {
        this.schoolId = this.stateSvc.getUserData('schoolId');
        await this.studSvc.getStudents(this.schoolId).then((res: any) => {
            console.log(res);

            this.students = res.data;
        });
        // try {
        //     const res: any = await this.studSvc.getStudents(this.schoolId);
        //     console.log(res);
        //     this.students = res.data;
        // } catch (error) {
        //     console.error(error);
        // }
    }

    addStudent() {
        this.router.navigate(['/main/student/add-student']);
    }

    bulkUpload() {
        this.router.navigate(['/main/student/bulkUpload']);
    }
}
