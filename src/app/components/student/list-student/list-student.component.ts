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

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
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
    saveOptions!: any[];

    selectedSchool: any;
    private dataSubscription!: Subscription;

    constructor(
        private router: Router,
        private studSvc: StudentService,
        private stateSvc: StateService,
        private fb: FormBuilder
    ) {}
    ngOnInit(): void {
        this.saveOptions = [
            {
                label: 'Download as Excel',
                icon: 'pi pi-file-excel',

                command: () => {
                    this.exportTableData('xlsx');
                },
            },
            {
                label: 'Download as CSV',
                icon: 'pi pi-file',
                command: () => {
                    this.exportTableData('csv');
                },
            },
        ];
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

        await this.studSvc.getStudents(this.schoolId).subscribe(
            (students: any) => {
                this.students = students;
                console.log(this.students);
            },
            (error) => {
                console.log('some error', error);
            }
        );
    }

    exportTableData(format: any) {
        // this.messageService.showSuccess('Your file is being downloaded. Please wait...');
        const rows = [];
        const columns = [
            'REG NO',
            'FIRST NAME',
            'LAST NAME',
            'ROLL NO',
            'GENDER',
            'STD',
            'DIV',
            'EMAIL',
            'PHONE',
            'ACTION',
        ];
        rows.push(columns);
        for (const student of this.students) {
            rows.push([
                student.uniqueId,
                student.firstName,
                student.lastName,
                student.rollNo,
                student.gender,
                student.std,
                student.div,
                student.email,
                student.mobileNo,
            ]);
        }
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
        let bookType: any, fileName;
        if (format === 'csv') {
            bookType = 'csv';
            fileName = 'students.csv';
        } else if (format === 'xlsx') {
            bookType = 'xlsx';
            fileName = 'students.xlsx';
        }

        const buffer = XLSX.write(workbook, { bookType, type: 'array' });

        const file = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(file, fileName);
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
