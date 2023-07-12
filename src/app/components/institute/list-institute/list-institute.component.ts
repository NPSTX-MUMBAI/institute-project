import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InstituteService } from '../../../services/institute.service';
import { StateService } from '../../../services/state.service';
import { Institute } from 'src/app/models/institute.model';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'app-list-institute',
    templateUrl: './list-institute.component.html',
    styleUrls: ['./list-institute.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListInstituteComponent implements OnInit {
    value5: any;
    listInstitute!: FormGroup;
    instituteFilter!: FormGroup;

    institute!: Institute[];
    items!: MenuItem[];
    selectedInstitute: any;
    saveOptions!: any[];
    //dropdownItems=[]

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private stateSvc: StateService,
        private instSvc: InstituteService,
        private filterSvc: FilterService,
        private msg: MessageService
    ) {}
    ngOnInit(): void {
        let myUser: any = this.stateSvc.getUserData('userId');
        console.log(myUser);
        this.instSvc.getInstitutesForUser(myUser).then((res: any) => {
            const finalArray = [];

            for (const item of res.data) {
                const schoolData = {
                    ...item.school,
                    ...item.address,
                };
                finalArray.push(schoolData);
            }
            this.institute = finalArray;

            console.log(this.institute);
        });

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

        this.instituteFilter = this.fb.group({
            uniqueId: [''],
            instituteName: [''],
            instituteType: [''],
            institutePhone: [''],
            city: [''],
            state: [''],
        });
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

    dropdownItems = [
        { name: 'Select Type' },
        { name: 'Bank' },
        { name: 'School' },
        { name: 'Jr School' },
    ];
    AddInstitute() {
        this.router.navigate(['/main/institute/add']);
    }

    exportTableData(format: any) {
        // this.messageService.showSuccess('Your file is being downloaded. Please wait...');
        const rows = [];
        const columns = [
            'UNIQUE NO',
            'NAME',
            'TYPE',
            'PHONE NO',
            'CITY',
            'STATE',
            'ACTION',
        ];
        rows.push(columns);
        for (const institute of this.institute) {
            rows.push([
                institute.uniqueno,
                institute.instituteName,
                institute.instituteType,
                institute.mobileNo,
                institute.city,
                institute.state,
            ]);
        }

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Institute');
        let bookType: any, fileName;
        if (format === 'csv') {
            bookType = 'csv';
            fileName = 'Institute.csv';
        } else if (format === 'xlsx') {
            bookType = 'xlsx';
            fileName = 'Institute.xlsx';
        }

        const buffer = XLSX.write(workbook, { bookType, type: 'array' });

        const file = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(file, fileName);
    }

    async filteredValues() {
        console.log(this.instituteFilter.value);
        let data = {
            instituteName: this.instituteFilter.value.instituteName,
            institutePhone: this.instituteFilter.value.phoneNo,
            instituteType: this.instituteFilter.value.type,
            city: this.instituteFilter.value.city,
            state: this.instituteFilter.value.state,
            uniqueId: this.instituteFilter.value.uniqueNo,
        };

        try {
            const res: any = await this.filterSvc.schoolFilter(data);
            console.log(data);

            if (res.status) {
                this.stateSvc.setUserData('userId', res.data);

                this.msg.add({
                    severity: 'success',
                    detail: 'shivaniiiiiiiiiiiii',
                });
            } else {
                this.msg.add({
                    severity: 'warn',
                    summary: 'error',
                    detail: 'Invalid shivaniiiiiiiiiii',
                });
                // this.loading = false;
            }

            console.log(res);
        } catch (error) {
            this.msg.add({
                severity: 'warn',
                summary: 'error',
                detail: 'Something went wrong',
            });
            console.error(error);
        }
    }
}
