import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, from } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListStudentComponent implements OnInit, OnDestroy {
    students: any = [];
    schoolId: any;
    items: any;
    studentFilter!: FormGroup;

    selectedSchool: any;
    private dataSubscription!: Subscription;

    constructor(
        private router: Router,
        private studSvc: StudentService,
        private stateSvc: StateService,
        private fb: FormBuilder
    ) {}
    ngOnInit(): void {
        this.studentFilter = this.fb.group({
            uniqueId: [''],
            firstName: [''],
            lastName: [''],
            email: [''],
            mobileNo: [''],
            rollNo: [''],
            gender: [''],
            std: [''],
            div: [''],
        });
        this.schoolId = this.stateSvc.getUserData('schoolId');

        // if (!this.schoolId) {
        //     this.router.navigate(['/']);

        //     return;
        // }
        this.getAllStudents();
        this.dataSubscription = this.stateSvc
            .getData()
            .subscribe((response: any) => {
                console.log('ins--->', response);
                this.getAllStudents();
            });

        // this.stateSvc.getData().subscribe((response: any) => {
        //     console.log('ins--->', response);
        //     this.getAllStudents();
        // });
    }
    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
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

    filteredValues() {
        console.log(this.studentFilter.value);
    }

    addStudent() {
        this.router.navigate(['/main/student/add-student']);
    }

    bulkUpload() {
        this.router.navigate(['/main/student/bulkUpload']);
    }
}
