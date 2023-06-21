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

    handleClick(id: any) {
        console.log(event);

        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                routerLink: ['/main/institute/add'],
                queryParams: { schoolId: id },
                queryParamsHandling: 'merge',
            },
            {
                label: 'Add std & div',
                icon: 'pi pi-pencil',
                routerLink: ['/main/institute/addstddiv'],
                queryParams: { schoolId: id },
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
