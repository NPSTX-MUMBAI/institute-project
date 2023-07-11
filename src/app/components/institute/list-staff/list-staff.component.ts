import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng/api';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-list-staff',
    templateUrl: './list-staff.component.html',
    styleUrls: ['./list-staff.component.scss'],
})
export class ListStaffComponent implements OnInit, OnDestroy {
    staff: any = [];
    schoolId: any;
    private dataSubscription!: Subscription;
    staffFilter!: FormGroup;
    saveOptions!: any[];
    items!: MenuItem[];

    constructor(
        private router: Router,
        private authSvc: AuthService,
        private stateSvc: StateService,
        private fb: FormBuilder
    ) {}

    // ngOnInit(): void {
    //     this.schoolId = this.stateSvc.getUserData('schoolId');

    //     this.getAllStaff();
    //     this.stateSvc.getData().subscribe((response: any) => {
    //         console.log('ins--->', response);
    //         this.getAllStaff();
    //     });
    // }
    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        this.dataSubscription = this.stateSvc
            .getData()
            .subscribe((response: any) => {
                if (this.schoolId) {
                    this.getAllStaff();
                }
            });

        // Fetch initial bank and staff lists
        this.getAllStaff();

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

        this.staffFilter = this.fb.group({
            firstName: [''],
            lastName: [''],
            email: [''],
            mobileNo: [''],
        });
    }
    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }

    // async getAllStaff() {
    //     let data = {
    //         schoolId: this.schoolId,
    //         userType: 'STAFF',
    //     };
    //     await this.authSvc.getStaff(data).then((res: any) => {
    //         console.log(res);

    //         this.staff = res.data;
    //     });
    // }
    async getAllStaff() {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        let data = {
            schoolId: this.schoolId,
            userType: 'STAFF',
        };

        await this.authSvc.getStaff(data).then((res: any) => {
            console.log(res);
            this.staff = res.data;
        });
    }

    navigateToAddBank() {
        this.router.navigate(['/main/institute/staff/add']);
    }

    handleClick(Id: any) {
        console.log(event);

        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                routerLink: ['/main/institute/staff/add'],
                queryParams: { userId: Id },
                queryParamsHandling: 'merge',
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {},
            },
        ];
    }

    exportTableData(format: any) {
        // this.messageService.showSuccess('Your file is being downloaded. Please wait...');
        const rows = [];
        const columns = [
            'FIRST NAME',
            'LAST NAME',
            'EMAIL',
            'MOBILE NO',
            'ACTION',
        ];
        rows.push(columns);
        for (const staff of this.staff) {
            rows.push([
                staff.firstname,
                staff.lastname,
                staff.accountno,
                staff.email,
                staff.mobileNo,
            ]);
        }
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff');
        let bookType: any, fileName;
        if (format === 'csv') {
            bookType = 'csv';
            fileName = 'staff.csv';
        } else if (format === 'xlsx') {
            bookType = 'xlsx';
            fileName = 'staff.xlsx';
        }

        const buffer = XLSX.write(workbook, { bookType, type: 'array' });

        const file = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(file, fileName);
    }

    filteredValues() {
        console.log(this.staffFilter.value);
    }
}
